# GitHub Contribution Bot
## by Freson

![GitHub Contribution Bot Banner]([https://raw.githubusercontent.com/FresonDev/cdnPublic/refs/heads/main/banner_contribot](https://github.com/FresonDev/cdnPublic/blob/main/contribot.png?raw=true))

## Overview
**GitHub Contribution Bot** is a Node.js-based automation tool that periodically generates random file changes and pushes commits to a specified GitHub repository. This bot can simulate contributions and is configurable for personal use.

This script was created by [FresonDev](https://github.com/FresonDev).

## Features
- **Automated Repository Verification**: Verifies if the specified repository exists and is accessible.
- **Random Content Generation**: Creates a file with randomised content that changes with each commit.
- **Automated Commits and Pushes**: Adds commits and pushes to the repository at set intervals.
- **Customisable Commit Count**: Allows for a target number of commits to be made.

## Prerequisites

Ensure you have the following set up before running this bot:
- [Node.js](https://nodejs.org) installed
- A GitHub account
- A GitHub Personal Access Token (PAT) with `repo` permissions to authenticate the bot

## Setup

1. **Clone the Repository**  
   Download the script files by cloning the repository or downloading the source files.

2. **Install Dependencies**  
   Navigate to the project folder and run:
   ```bash
   npm install
   ```
   This will install the required packages: `axios` for HTTP requests and `simple-git` for Git commands.

3. **Configure Your Profile**  
   Open the script file and configure the following variables:
   ```javascript
   const token = '';  // GitHub Personal Access Token
   const username = '';  // Your GitHub Username
   const repo = '';  // Name of the Repository to Commit to
   ```
   Replace these empty strings with your actual token, username, and repository name.

## Usage

1. **Run the Bot**  
   After configuring, start the bot by running:
   ```bash
   node your_script.js
   ```
   This will initiate the bot, and you should see logs displayed in the console with timestamps and the bot’s actions.

2. **Customise Commit Frequency and Limit**  
   You can adjust the commit interval (currently set to 500 ms) and the target commit count (currently `54178`). Modify these values in the following section of the code if desired:
   ```javascript
   const commitInterval = setInterval(async () => { ... }, 500); // 500 ms interval
   if (commitCount >= 54178) { ... } // Target commit count
   ```

3. **Monitoring the Bot**  
   The bot logs each action with a timestamped message in the console, making it easy to track its progress. Each time the bot starts, it will display the ASCII banner.

## Troubleshooting

- **Repository Not Found**: If you receive a "Repository not found" error, ensure the repository name, username, and token are correctly configured and have the necessary permissions.
- **Authentication Errors**: Double-check your PAT permissions; the token should have `repo` scope for private repositories.

## Disclaimer

This bot was developed for educational and personal use only. Automated commits to artificially increase contribution counts may violate GitHub’s terms of service if abused. Please use responsibly.

---

© 2024 by [FresonDev](https://github.com/FresonDev)
```

Este `README.md` está diseñado para que el usuario pueda instalar, configurar y ejecutar el bot con facilidad. Además, incluye una advertencia sobre el uso responsable.
