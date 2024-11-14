// github.com/FresonDev
// github.com/FresonDev/contribot
// v1.2.7
// discord.gg/freshcord
// Fresón,
// cheers.

const axios = require('axios');
const simpleGit = require('simple-git');
const git = simpleGit();
const fs = require('fs');
const https = require('https');

// GitHub Access Token (Personal Access Token) - Required for authentication
const token = '';  // GitHub PAT

// Script config
const username = '';  // GitHub Username
const repo = '';  // GitHub Repository

const repoURL = `https://${token}@github.com/${username}/${repo}.git`;

// GitHub API Configuration - Necessary headers for GitHub API requests
const config = {
  headers: {
    'Authorization': `Bearer ${token}`,  // Token used for API authentication
    'Accept': 'application/vnd.github.v3+json',
  },
};

function logMessage(message) {
  const now = new Date();
  const timestamp = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  console.log(`[${timestamp}] GH Contribution Bot: ${message}`);
}

async function displayBanner() {
  return new Promise((resolve, reject) => {
    https.get('https://raw.githubusercontent.com/FresonDev/cdnPublic/refs/heads/main/banner_contribot', (res) => {
      res.setEncoding('utf8');
      let banner = '';
      res.on('data', (chunk) => { banner += chunk; });
      res.on('end', () => {
        console.log(banner);
        resolve();
      });
    }).on('error', (err) => {
      logMessage(`Error fetching banner: ${err.message}`);
      reject(err);
    });
  });
}

async function verifyRepo() {
  try {
    const response = await axios.get(`https://api.github.com/repos/${username}/${repo}`, config);
    logMessage(`Repository found: ${response.data.name}`);
  } catch (error) {
    logMessage(`Error verifying repository: ${error.response ? error.response.data : error.message}`);
    process.exit(1);
  }
}

function generateRandomString() {
  return Math.random().toString(36).substring(2, 28);
}

async function commitChanges() {
  try {
    logMessage('Initialising local repository...');
    if (!fs.existsSync('farmingrepo')) {
      fs.mkdirSync('farmingrepo');
    }
    await git.clone(repoURL, 'farmingrepo');

    const repoPath = './farmingrepo';
    const fileName = 'freson.dev';

    fs.writeFileSync(`${repoPath}/${fileName}`, generateRandomString());

    let commitCount = 0;
    const commitInterval = setInterval(async () => {
      const newContent = generateRandomString() + "by github.com/FresonDev";
      fs.writeFileSync(`${repoPath}/${fileName}`, newContent);

      try {
        await git.cwd(repoPath).add(fileName).commit(`Contribution #${commitCount + 1}`);
        logMessage(`Commit #${commitCount + 1} added!`);
        commitCount++;
      } catch (error) {
        logMessage(`Error committing: ${error.message}`);
      }

      try {
        await git.cwd(repoPath).push('origin', 'main');
      } catch (pushError) {
        // logMessage(`Error pushing to repository: ${pushError.message}`);
        logMessage(`Rate-limit error.`);
      }

      if (commitCount >= 54178) {
        clearInterval(commitInterval);
        logMessage('All commits completed.');
      }
    }, 500);

  } catch (error) {
    logMessage(`Error in commit process: ${error.message}`);
  }
}

async function runBot() {
  await displayBanner();
  await verifyRepo();
  await commitChanges();
}

runBot();
