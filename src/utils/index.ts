import { remark } from "remark";
import html from "remark-html";
import axios from "axios";


export async function markdownToHtml(markdown: any) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const dayOfWeek = days[date.getUTCDay()];
  const dayOfMonth = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
}

export function formatNumber(number: number): string {
  return number.toLocaleString();
}


export async function fetchAndStoreDataFromGitHubFolder(url: any) {
  try {
    const response = await axios.get(url);
    const markdownContent = response.data;
    console.log(markdownContent)
    return markdownContent;
  } catch (error: any) {
    console.error('Error fetching data from GitHub:', error.message);
  }
}

export function timeAgo(isoDateString: string): string {
  const inputDate = new Date(isoDateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
}


export function extractUUID(input: string): string | null {
  const regex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
  const match = input.match(regex);
  return match ? match[0] : null;
}



export default fetchAndStoreDataFromGitHubFolder;