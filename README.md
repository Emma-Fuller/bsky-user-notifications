# Notification Subscription Thingy

This repo contains the code to watch the bsky firehose, watch for notifications from subscribed to
individuals, and send new post notifications to my phone when they post

Most of the code is a stripped down version of https://github.com/bluesky-social/feed-generator

The interesting bits are in `src/pushnotifs.ts`

The list of people who notifications are sent for is in `TO_INCLUDE_LIST`

Push notification handling is done by https://pushover.net/ and requires the following environment variables
- PUSHOVER_USER
- PUSHOVER_TOKEN