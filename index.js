const { WebClient } = require('@slack/web-api');
const { RTMClient } = require('@slack/rtm-api');
const request = require('request-promise');

const slackWebClient = new WebClient(process.env.SLACK_BOT_TOKEN);
const rtm = new RTMClient(process.env.SLACK_BOT_TOKEN);
let spotifyAccessToken = null;

async function getCurrentlyPlayingTrack() {
  const options = {
    url: 'https://api.spotify.com/v1/me/player/currently-playing',
    headers: { Authorization: `Bearer ${spotifyAccessToken}` },
    json: true,
  };
  try {
    const response = await request.get(options);
    return response.item.name;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function authorizeSpotify(event) {
  const options = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      grant_type: 'authorization_code',
      code: event.query.code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    },
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    json: true,
  };
  try {
    const response = await request.post(options);
    spotifyAccessToken = response.access_token;
    const message = {
      channel: event.state.channel_id,
      text: 'Thank you for authorizing me to access your Spotify account.',
    };
    await slackWebClient.chat.postMessage(message);
  } catch (error) {
    const message = {
      channel: event.state.channel_id,
      text: 'Sorry, I could not authorize your Spotify account.',
    };
    await slackWebClient.chat.postMessage(message);
  }
}

rtm.on('message', async (event) => {
  if (event.text && event.text.includes(`<@${rtm.activeUserId}> spotify`)) {
    if (!spotifyAccessToken) {
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&scope=user-read-currently-playing`;
      const message = {
        channel: event.channel,
        text: `Please authorize me to access your Spotify account by visiting this URL: ${authUrl}`,
      };
      await slackWebClient.chat.postMessage(message);
    } else {
      const trackName = await getCurrentlyPlayingTrack();
      const message = {
        channel: event.channel,
        text: `You're currently listening to: ${trackName}`,
      };
      await slackWebClient.chat.postMessage(message);
    }
  }
});

rtm.start();
