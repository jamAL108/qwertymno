import { remark } from "remark";
import html from "remark-html";
import axios from "axios";


export async function markdownToHtml(markdown:any) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export const formatDate = (inputDate: string): string => {
  const date = new Date(inputDate);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };

  return date.toLocaleDateString('en-GB', options);
};


export async function fetchAndStoreDataFromGitHubFolder(url:any) {
  try {
    const response = await axios.get(url);
    const markdownContent = response.data;
    console.log(markdownContent)
    return markdownContent;
  } catch (error:any) {
    console.error('Error fetching data from GitHub:', error.message);
  }
}
export default fetchAndStoreDataFromGitHubFolder;