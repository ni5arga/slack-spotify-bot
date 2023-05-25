# Slack-Spotify-Bot

This is a Slack bot that shows what you're currently listening to on Spotify. When mentioned with the trigger word "spotify", the bot will check if it has access to your Spotify account. If it doesn't, it will prompt you to authorize the app. If it does, it will use your access token to get the currently playing track and post a message in the Slack channel. This code sets up a Slack bot using the Slack Web API and Real-Time Messaging API, and uses the request-promise library to make requests to the Spotify Web API. The bot listens for messages in Slack channels that mention the bot with the trigger word "spotify", and checks if it has access to the user's Spotify account. If it doesn't, it prompts the user to authorize the app using the Spotify Accounts API. If it does, it gets the currently playing track from the Spotify Web API and posts a message in the Slack channel with the track name.

## Setup

To set up the Slack-Spotify-Bot, follow these steps:

1. Create a new bot in your Slack workspace and take note of the bot's API token.
2. Create a new app in your Spotify developer dashboard and take note of the app's client ID and client secret.
3. Authorize your app to access your Spotify account and get an access token.
4. Deploy the bot to a hosting service such as Heroku or AWS Lambda.
5. Add a new OAuth redirect URI in your Spotify app's settings to point to your deployed app's URL.
6. Invite the bot to a channel in your Slack workspace and mention it with the trigger word "spotify".
7. When prompted, authorize the app to access your Spotify account.
8. Mention the bot with the trigger word "spotify" again to see what you're currently listening to on Spotify.

## Usage

To use the Slack-Spotify-Bot, simply mention the bot in a channel with the trigger word "spotify". If the bot has access to your Spotify account, it will post a message with the currently playing track.

## Dependencies

The Slack-Spotify-Bot requires the following dependencies:

- @slack/web-api
- @slack/rtm-api
- request
- request-promise

You can install these dependencies using NPM: `npm install --save @slack/web-api @slack/rtm-api request request-promise`


## Configuration

To configure the Slack-Spotify-Bot, you'll need to set the following environment variables:

- `SLACK_BOT_TOKEN`: The API token for your Slack bot.
- `SPOTIFY_CLIENT_ID`: The client ID for your Spotify app.
- `SPOTIFY_CLIENT_SECRET`: The client secret for your Spotify app.
- `SPOTIFY_REDIRECT_URI`: The redirect URI for your Spotify app's OAuth flow.

## License

The Slack-Spotify-Bot is licensed under the MIT License. See the [LICENSE file](https://github.com/ni5arga/slack-spotify-bot/blob/main/LICENSE) for more information.


