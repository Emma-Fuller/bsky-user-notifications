import { DidResolver } from '@atproto/did-resolver'
import { Record } from './lexicon/types/app/bsky/feed/post'
import { CreateOp } from './util/subscription'

type PushoverMessage = {
    message: string
    title: string
    url: string
    url_title: string
}

const TO_INCLUDE_LIST = [
    'did:plc:3nodfbwjlsd77ckgrodawvpv', // Rem
    'did:plc:p3vdrhjpqfnrj5523b5dnl7c', // Stas
    'did:plc:v72r2bhsatxikmiqogwg6vro', // Bee 🥺💖
    'did:plc:funyx6lhibbiivqw6lst7eik', // Me (Emma)
]

declare function fetch(a: String, b: any): Promise<any>;
export async function sendNotification(msg: PushoverMessage) {
    await fetch('https://api.pushover.net/1/messages.json', {
        method: 'POST',
        body: new URLSearchParams({
            'token': process.env['PUSHOVER_TOKEN'] ?? '',
            'user': process.env['PUSHOVER_USER'] ?? '',
            ...msg
        })
    })
}

function createPostLink(author: string, uri: string) {
    const postSlug = uri.split('/').at(-1)
    return `https://bsky.app/profile/${ author }/post/${ postSlug }`
}

async function getHandleFromDid(did: string, resolver: DidResolver) {
    const resolved = await resolver.resolveDid(did)
    return '@' + (resolved?.alsoKnownAs?.[0] ?? 'at://unknown')
        .replace('at://', '')
}

export async function handlePost(post: CreateOp<Record>, resolver: DidResolver) {
    if (TO_INCLUDE_LIST.includes(post.author) // Only people in the above list
        && !post.record.reply) { // Only top level posts, no replies!
        await sendNotification({
            title: `New post from ${ await getHandleFromDid(post.author, resolver) }`,
            message: post.record.text,
            url: createPostLink(post.author, post.uri),
            url_title: "Post Link"
        })
    }
}