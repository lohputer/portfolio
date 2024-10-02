"use client";
import React, { useState, useEffect, useCallback } from 'react'
import { fetchLanguages } from './fetchLanguages';

export default function Home() {
  const [langs, setLangs] = useState<[string, string][]>([]);
  const [endIndex, setEndIndex] = useState(0);
  const [writings, setWritings] = useState<{[id: string]: {[id: string]: string | [] | [[string, string]] }}>({});
  const API_KEY = "AIzaSyCp67khSNx3_0LXlvWjf6KZasYpdYDPbDU";
  const FOLDER_ID = "1PftxTQEdnWlGwDe3mek6SLHsjjqG8UQ2";
  const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`;
  var intro = "I  am Lyndon, member of EC3 [Electronics, Communications & Computing Club]. I am an aspiring web developer/writer/duck collector, none of which I am reaching but I hope to be able to get somewhat close :D "
  
  useEffect(() => {
    fetchLanguages().then((fetchedLangs) => {
      setLangs(fetchedLangs);
    });
    updateData();
    console.log(writings);
  }, []);
  
  const updateData = () => {
    fetch(url).then(response => response.json()).then(data => {
      data.files.forEach((file: any) => {
        var writing: {[id: string]: string | [] | [[string, string]] } = {}
        fetch(`https://www.googleapis.com/drive/v3/files/${file.id}/export?mimeType=text/html&key=${API_KEY}`).then(response => response.text()).then(content => {
          let bodyContent = content.match(/<body(.*?)>(.*?)<\/body>/g);
          if (bodyContent) {
            if (bodyContent[0]) {
              let bodyText = bodyContent[0];
              let sections = bodyText.split(/<h2[^>]*><span[^>]*>(.*?)<\/span><\/h2>/g);
              for (let i=1; i<sections.length; i+=2) {
                if (sections[i] == "Synopsis") {
                  writing["Synopsis"] = sections[i+1];
                } else if (sections[i] == "Content") {
                  let chaps = sections[i+1].split(/<h3[^>]*><span[^>]*>(.*?)<\/span><\/h3>/g);
                  if (chaps.length == 1) {
                    writing["Content"] = chaps[0];
                  } else {
                    if (!Array.isArray(writing["Content"])) {
                      writing["Content"] = [];
                    }
                    for (let j = 1; j < chaps.length; j += 2) {
                      (writing["Content"] as [[string, string]]).push([chaps[j], chaps[j + 1]]);
                    }
                  }
                }
              }
              console.log(writing);
              setWritings(prevWritings => ({
                ...prevWritings,
                [file.name]: writing
              }));
            }
          }
        }).catch(error => {
          console.error('Error fetching file content:', error);
        });
      });
    }).catch(error => console.error('Error:', error));
  }
  const typeAnimation = (text: String, id: string) => useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        var div = document.getElementById(id);
        if (div) {
          if (text.charAt(i) != "~") {
            div.textContent += text.charAt(i);
          } else {
            div.textContent += "\n"
          }
        }
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  function typeFunction(text: String, id: string) {
    let i = 0;
    var taboos : {[id: string]: string} = {"~": "\n", '"': "&quot;", "'": "&apos;"}
    const interval = setInterval(() => {
      if (i < text.length) {
        var div = document.getElementById(id);
        if (div) {
          if (Object.keys(taboos).includes(text.charAt(i))) {
            div.innerHTML += taboos[text.charAt(i)]
          } else {
            div.innerHTML += text.charAt(i);
          }
        }
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }
  const handleScroll = useCallback(() => {
    const div = document.getElementById("endCoding");
    if (div) {
      if (div.getBoundingClientRect().top < window.innerHeight - 20) {
        if (endIndex < langs.length) {
          for (let j=0; j<langs[endIndex][1].split("~").length; j++) {
            typeFunction(langs[endIndex][1].split("~")[j], langs[endIndex][0] + j.toString());
          }
          setEndIndex(prevIndex => prevIndex + 1);
        }
        console.log(endIndex);
      }
    }
  }, [langs, endIndex, typeFunction]);

  useEffect(() => {
    const debounceScroll = debounce(handleScroll, 200);
    window.addEventListener("scroll", debounceScroll);
    return () => window.removeEventListener("scroll", debounceScroll);
  }, [handleScroll]);

  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  typeAnimation(intro, "about")
  return (
    <main className="bg-yellow-100 flex min-h-screen flex-col items-centers">
      <nav className="fixed p-5 z-20 w-full font-mono text-md gap-3 md:gap-5 flex flex-row justify-between bg-orange-500 border-b-4 border-b-yellow-400">
        <div className="flex flex-row float-left gap-5 justify-center items-center">
          <a className="z-20 text-xl lg:text-2xl text-yellow-400 font-bold" href="#aboutme">lohputer</a>
          <a className="z-20 text-base lg:text-lg text-yellow-100 font-semibold" href="#coding">coding</a>
          <a className="z-20 text-base lg:text-lg text-yellow-100 font-semibold" href="#writing">writing</a>
          <a className="z-20 text-base lg:text-lg text-yellow-100 font-semibold" href="#misc">misc</a>
        </div>
        <div className="flex flex-row float-right gap-5">
          <a className="z-20 text-base lg:text-lg text-yellow-100 font-semibold" href="https://github.com/lohputer">GitHub</a>
        </div>
      </nav>
      <br id="aboutme" className="m-5" />
      <div className="mt-20 z-10 items-center justify-center font-mono text-md flex flex-col w-full">
        <p className="text-center text-base md:text-xl text-orange-500">Hi I&apos;m</p>
        <h1 className="text-center text-2xl md:text-4xl text-orange-500 font-semibold">lohputer</h1>
        <div className="max-h-max rounded-3xl border-4 border-yellow-400 bg-orange-500 py-4 px-8 lg:py-8 m-10 md:grid md:grid-cols-2 md:grid-flow-row gap-5 w-4/5">
          <div className="text-yellow-100 h-full items-left justify-center flex flex-col py-4">
            <h1 className="mb-2 text-left text-xl md:text-2xl lg:text-3xl font-semibold">About Me</h1>
            <p id="about" className="text-left text-sm md:text-base lg:text-xl"></p>
          </div>
          <img id="coding" src="bread.jpeg" className="rounded-3xl"></img>
        </div>
        <h1 className="text-center text-2xl md:text-4xl text-orange-500 font-semibold">My Programming Languages</h1>
        <div className="py-4 px-8 lg:py-8 m-5 flex flex-col gap-10 items-center justify-center">
          {langs.slice(0,endIndex).map((lang)=>
            <div key={langs.slice(0,endIndex).indexOf(lang)} className="flex flex-row max-h-min items-center justify-center gap-5">
              <img src={lang[0]} className="max-h-24 lg:max-h-48" />
              <div className="flex flex-col items-left justify-center bg-orange-500 rounded-3xl p-4">
                {lang[1].split("~").map((line)=>
                  <code className="text-white" key={lang[1].split("~").indexOf(line)} id={lang[0] + lang[1].split("~").indexOf(line).toString()}></code>
                )}
              </div>
            </div>
          )}
        </div>
        <br id="endCoding" />
        <h1 className="text-center text-2xl md:text-4xl text-orange-500 font-semibold">My Frameworks</h1>
        <div className="py-4 px-8 lg:py-8 m-5 items-center justify-center flex flex-wrap gap-10">
          <div className="text-blue-500 items-center justify-center flex flex-col w-32">
            <img src="react.png" className="aspect-square" />
            <div className="max-w-max">
              <h2 className="text-center text-lg md:text-xl lg:text-2xl font-semibold">React</h2>
              <p className="text-center text-sm md:text-base lg:text-xl">Frontend 1</p>
            </div>
          </div>
          <div className="text-blue-500 items-center justify-center flex flex-col w-32">
            <img src="next.svg" className="aspect-square" />
            <div className="max-w-max">
              <h2 className="text-center text-lg md:text-xl lg:text-2xl font-semibold">Next.js</h2>
              <p className="text-center text-sm md:text-base lg:text-xl">Frontend 2</p>
            </div>
          </div>
          <div className="text-blue-500 items-center justify-center flex flex-col w-32">
            <img src="bootstrap.svg" className="aspect-square" />
            <div className="max-w-max">
              <h2 className="text-center text-lg md:text-xl lg:text-2xl font-semibold">Bootstrap</h2>
              <p className="text-center text-sm md:text-base lg:text-xl">Styling 1</p>
            </div>
          </div>
          <div className="text-blue-500 items-center justify-center flex flex-col w-32">
            <img src="tailwind.png" className="aspect-square" />
            <div className="max-w-max">
              <h2 className="text-center text-lg md:text-xl lg:text-2xl font-semibold">Tailwind</h2>
              <p className="text-center text-sm md:text-base lg:text-xl">Styling 2</p>
            </div>
          </div>
          <div className="text-blue-500 items-center justify-center flex flex-col w-32">
            <img src="django.png" className="aspect-square" />
            <div className="max-w-max">
              <h2 className="text-center text-lg md:text-xl lg:text-2xl font-semibold">Django</h2>
              <p className="text-center text-sm md:text-base lg:text-xl">Backend 1</p>
            </div>
          </div>
        </div>
        <h1 className="text-center text-2xl md:text-4xl text-orange-500 font-semibold">My Tools</h1>
        <ul className="m-5 list-disc">
          <li className="text-base md:text-xl text-orange-500">GitHub</li>
          <li className="text-base md:text-xl text-orange-500">Git</li>
          <li className="text-base md:text-xl text-orange-500">Netlify</li>
          <li className="text-base md:text-xl text-orange-500">Vercel</li>
        </ul>
        <h1 className="text-center text-2xl md:text-4xl text-orange-500 font-semibold">My Milestones :D</h1>
        <div className="max-h-max rounded-3xl border-4 border-yellow-400 bg-orange-500 py-4 px-8 lg:py-8 m-10 gap-5 w-4/5 md:flex md:flex-row md:justify-center md:items-center">
          <img src="vsctf.png" className="rounded-3xl md:w-1/2"></img>
          <div className="text-yellow-100 h-full items-left justify-center flex flex-col py-4">
            <h1 className="mb-2 text-left text-xl md:text-2xl lg:text-3xl font-semibold">vsCTF 2024</h1>
            <p className="text-left text-sm md:text-base lg:text-xl">View Source's 3rd CTF (Capture The Flag) is a 24-hour international competition in which participants compete to find and exploit vulnerabilities in a system to capture the most "flags" before time runs outs. With my classmates, we formed the team "baked radish" and reached 6th in high school division.</p>
          </div>
        </div>
        <div className="max-h-max rounded-3xl border-4 border-yellow-400 bg-orange-500 py-4 px-8 lg:py-8 m-10 gap-5 w-4/5 md:flex md:flex-row md:justify-center md:items-center">
          <img src="quiz.png" className="rounded-3xl md:w-1/2"></img>
          <div className="text-yellow-100 h-full items-left justify-center flex flex-col py-4">
            <h1 className="mb-2 text-left text-xl md:text-2xl lg:text-3xl font-semibold">Quiz App</h1>
            <p className="text-left text-sm md:text-base lg:text-xl">Simple 25 MCQ Quiz</p>
          </div>
        </div>
        <h1 className="text-center text-2xl md:text-4xl text-orange-500 font-semibold">Writing :D</h1>
        <div className="py-4 px-8 lg:py-8 m-5 flex flex-col gap-10 items-center justify-center">
          {Object.entries(writings).map(([fileName, writing]) => (
            <div key={fileName} className="flex flex-col items-left justify-center bg-orange-500 rounded-3xl p-4 w-full max-w-xl">
              <h2 className="text-xl font-semibold">{fileName}</h2>
              <div className="mt-2">
                {typeof writing.Synopsis === 'string' && <p><strong>Synopsis:</strong> {writing.Synopsis}</p>}
                {typeof writing.Content === 'string' && <p><strong>Content:</strong> {writing.Content}</p>}
                {Array.isArray(writing.Content) && (
                  <div>
                    {writing.Content.map(([title, content], index) => (
                      <div key={index} className="mt-2">
                        <h3 className="font-semibold">{title}</h3>
                        <p>{content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
