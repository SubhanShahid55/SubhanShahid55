import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const username = process.env.PROFILE_USERNAME || process.env.GITHUB_REPOSITORY_OWNER || 'SubhanShahid55';
const token = process.env.GITHUB_TOKEN;
const outputDirectory = path.join(process.cwd(), 'assets', 'generated');

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'profile-readme-card-generator',
  'X-GitHub-Api-Version': '2022-11-28',
};

if (token) headers.Authorization = `Bearer ${token}`;

async function getJson(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`GitHub API request failed (${response.status}): ${url}`);
  return response.json();
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value || 0);
}

function metric(x, label, value, accent) {
  return `<g transform="translate(${x} 118)"><text class="metric" x="0" y="0">${formatNumber(value)}</text><rect x="0" y="14" width="42" height="3" rx="1.5" fill="${accent}" /><text class="label" x="0" y="41">${escapeXml(label)}</text></g>`;
}

function achievement(x, y, title, detail, earned) {
  const color = earned ? '#22d3ee' : '#64748b';
  const fill = earned ? '#12283a' : '#141b2b';
  const status = earned ? 'Earned' : 'In progress';
  return `<g transform="translate(${x} ${y})"><rect width="360" height="92" rx="14" fill="${fill}" stroke="${color}" stroke-opacity="0.75" /><path d="M29 18h24v20c0 14-12 21-12 21s-12-7-12-21V18zm0 5H21v9c0 7 4 12 10 14M53 23h8v9c0 7-4 12-10 14M33 63h16m-8-4v13" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /><text class="achievement-title" x="78" y="34">${escapeXml(title)}</text><text class="achievement-detail" x="78" y="55">${escapeXml(detail)}</text><text class="status" x="78" y="76" fill="${color}">${status}</text></g>`;
}

async function main() {
  const [profile, repositories] = await Promise.all([
    getJson(`https://api.github.com/users/${encodeURIComponent(username)}`),
    getJson(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&type=owner&sort=updated`),
  ]);
  const totalStars = repositories.reduce((total, repository) => total + repository.stargazers_count, 0);
  const updatedAt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date());
  const styles = `<style>text{font-family:Arial,Helvetica,sans-serif}.title{fill:#f8fafc;font-size:24px;font-weight:700}.subtitle,.label,.achievement-detail{fill:#94a3b8;font-size:14px}.metric{fill:#f8fafc;font-size:31px;font-weight:700}.achievement-title{fill:#f8fafc;font-size:17px;font-weight:700}.status{font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase}</style>`;
  const statsCard = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="220" viewBox="0 0 800 220" role="img" aria-labelledby="title description"><title id="title">GitHub analytics for ${escapeXml(username)}</title><desc id="description">Public repositories, total stars, followers, and public gists from GitHub.</desc>${styles}<rect width="800" height="220" rx="18" fill="#0d1117" stroke="#263449" /><rect x="0" y="0" width="7" height="220" rx="3.5" fill="#22d3ee" /><text class="title" x="40" y="53">GitHub Analytics</text><text class="subtitle" x="40" y="79">${escapeXml(username)} · refreshed ${updatedAt}</text>${metric(40, 'Public repositories', profile.public_repos, '#22d3ee')}${metric(225, 'Total stars', totalStars, '#a78bfa')}${metric(410, 'Followers', profile.followers, '#60a5fa')}${metric(595, 'Public gists', profile.public_gists, '#34d399')}</svg>`;
  const achievementsCard = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="290" viewBox="0 0 800 290" role="img" aria-labelledby="title description"><title id="title">GitHub achievements for ${escapeXml(username)}</title><desc id="description">Repository, star, follower, and gist milestones from GitHub public data.</desc>${styles}<rect width="800" height="290" rx="18" fill="#0d1117" stroke="#263449" /><text class="title" x="32" y="43">GitHub Achievements</text><text class="subtitle" x="32" y="67">Live milestones based on public GitHub profile data</text>${achievement(32, 88, 'Repository Builder', `${formatNumber(profile.public_repos)} public repositories`, profile.public_repos > 0)}${achievement(408, 88, 'Open Source Impact', `${formatNumber(totalStars)} stars received`, totalStars > 0)}${achievement(32, 184, 'Community Signal', `${formatNumber(profile.followers)} followers`, profile.followers > 0)}${achievement(408, 184, 'Knowledge Sharer', `${formatNumber(profile.public_gists)} public gists`, profile.public_gists > 0)}</svg>`;
  await mkdir(outputDirectory, { recursive: true });
  await Promise.all([writeFile(path.join(outputDirectory, 'github-stats.svg'), statsCard), writeFile(path.join(outputDirectory, 'github-achievements.svg'), achievementsCard)]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
