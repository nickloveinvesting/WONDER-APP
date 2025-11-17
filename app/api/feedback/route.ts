import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { type, title, description } = body;

    if (!type || !title || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get user profile for attribution
    const { data: profile } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single();

    const username = profile?.username || user.email || 'Anonymous User';

    // Prepare GitHub issue data
    const issueTitle = type === 'feature'
      ? `[Feature Request] ${title}`
      : `[Bug Report] ${title}`;

    const issueBody = `
## Submitted by: ${username}
**User ID:** ${user.id}
**Type:** ${type === 'feature' ? 'Feature Request' : 'Bug Report'}
**Date:** ${new Date().toISOString()}

---

### Description
${description}

---

*This feedback was submitted via the in-app feedback form.*
    `.trim();

    const labels = type === 'feature'
      ? ['enhancement', 'user-feedback']
      : ['bug', 'user-feedback'];

    // Create GitHub issue
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO || 'nickloveinvesting/Philosophy-app';

    if (!githubToken) {
      console.error('GitHub token not configured');
      return NextResponse.json(
        { error: 'Feedback service not configured. Please contact support.' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.github.com/repos/${githubRepo}/issues`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: issueTitle,
          body: issueBody,
          labels: labels,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GitHub API error:', errorData);
      throw new Error('Failed to create GitHub issue');
    }

    const issue = await response.json();

    return NextResponse.json({
      success: true,
      issueNumber: issue.number,
      issueUrl: issue.html_url
    });
  } catch (error: any) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}
