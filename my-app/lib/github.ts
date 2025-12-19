const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

export async function getGithubStats(username: string) {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    if (!GITHUB_TOKEN) {
        throw new Error('GITHUB_TOKEN is not defined in environment variables');
    }

    const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
        repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
          nodes {
            name
            stargazerCount
            forkCount
            url
            description
            languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
              nodes {
                name
                color
              }
            }
          }
        }
      }
    }
  `;

    const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { username },
        }),
        next: { revalidate: 3600 }, // Cache for 1 hour
    });

    const data = await response.json();

    if (data.errors) {
        console.error('GitHub API Errors:', data.errors);
        throw new Error('Failed to fetch GitHub data');
    }

    return data.data.user;
}
