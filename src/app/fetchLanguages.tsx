"use server";
export async function fetchLanguages() {
    const res = await fetch('coding.txt');
    const data = await res.text();
    const words = data.split('END\r\n');
    const fetchedLangs: [string, string][] = words.map((word) => {
      const paragraph = word.split('\r\n');
      const string = paragraph[0];
      return [string, paragraph.slice(1).join('~')];
    });
    return fetchedLangs;
  }