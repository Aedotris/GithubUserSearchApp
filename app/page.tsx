"use client";
import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaLink, FaTwitter, FaBuilding } from 'react-icons/fa';

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  blog: string;
  twitter_username: string;
  company: string;
  created_at: string;
}

export default function Home() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const fetchUser = async () => {
    if (username) {
      const res = await fetch(`https://api.github.com/users/${username}`);
      const data: GitHubUser = await res.json();
      setUser(data);
    }
  };

  return (
    <div className={`flex flex-col items-center min-h-screen p-6 transition-all ${isDarkMode ? 'bg-dark-blue text-white' : 'bg-light-bg text-dark-text'} font-sans`}>
      <header className="w-full max-w-xl flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">devfinder</h1>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)} 
          className="text-sm font-bold flex items-center"
        >
          {isDarkMode ? 'LIGHT' : 'DARK'}
          <span className="ml-2">{isDarkMode ? '🌞' : '🌜'}</span>
        </button>
      </header>

      <div className={`relative w-full max-w-xl mb-8 ${isDarkMode ? 'bg-dark-card' : 'bg-light-card'} rounded-lg`}>
        <input 
          type="text" 
          placeholder="Search GitHub username…" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full rounded-lg p-4 pl-12 outline-none transition-all ${isDarkMode ? 'bg-dark-card text-white placeholder-gray-text' : 'bg-light-card text-dark-text placeholder-gray-text'}`}
        />
        <svg xmlns="http://www.w3.org/2000/svg" className={`absolute left-4 top-4 h-6 w-6 ${isDarkMode ? 'text-light-blue' : 'text-dark-text'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z" />
        </svg>
        <button 
          onClick={fetchUser} 
          className={`absolute right-4 top-2 ${isDarkMode ? 'bg-light-blue text-white' : 'bg-dark-text text-white'} rounded-lg px-4 py-2 text-sm font-bold`}
        >
          Search
        </button>
      </div>

      {user && (
        <div className={`rounded-lg p-8 w-full max-w-xl transition-all ${isDarkMode ? 'bg-dark-card' : 'bg-light-card'}`}>
          <div className="flex flex-col md:flex-row items-center mb-6">
            <img src={user.avatar_url} alt={user.name} className="rounded-full w-24 h-24 md:w-32 md:h-32 mr-4" />
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className={`mt-2 ${isDarkMode ? 'text-light-blue' : 'text-dark-text'}`}>@{user.login}</p>
              <p className="mt-2 text-gray-text">{user.bio || "This profile has no bio"}</p>
            </div>
          </div>

          <div className={`rounded-lg p-4 flex flex-col md:flex-row justify-between mb-6 text-center transition-all ${isDarkMode ? 'bg-dark-blue' : 'bg-light-bg'}`}>
            <div className="mb-4 md:mb-0">
              <p className="text-gray-text">Repos</p>
              <p className="text-lg font-bold">{user.public_repos}</p>
            </div>
            <div className="mb-4 md:mb-0">
              <p className="text-gray-text">Followers</p>
              <p className="text-lg font-bold">{user.followers}</p>
            </div>
            <div>
              <p className="text-gray-text">Following</p>
              <p className="text-lg font-bold">{user.following}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between text-gray-text">
            {/* Left Column: Location and Blog */}
            <div className="flex flex-col md:w-1/2 space-y-2 mb-4 md:mb-0 items-center md:items-start">
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2" /> {user.location || "Not Available"}
              </p>
              <p className="flex items-center">
                <FaLink className="mr-2" />
                {user.blog ? <a href={user.blog} className="hover:underline">{user.blog}</a> : "Not Available"}
              </p>
            </div>
            {/* Right Column: Twitter and Company */}
            <div className="flex flex-col md:w-1/2 space-y-2 items-center md:items-end">
              <p className="flex items-center">
                <FaTwitter className="mr-2" /> {user.twitter_username ? `@${user.twitter_username}` : "Not Available"}
              </p>
              <p className="flex items-center">
                <FaBuilding className="mr-2" /> {user.company || "Not Available"}
              </p>
            </div>
          </div>

          <p className="text-gray-text text-sm mt-6">Joined {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}
