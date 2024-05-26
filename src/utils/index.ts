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
export default fetchAndStoreDataFromGitHubFolder;