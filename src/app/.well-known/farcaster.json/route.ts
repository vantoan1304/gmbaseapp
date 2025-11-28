function withValidProperties(properties: Record<string, undefined | string | string[]>) {
    return Object.fromEntries(
        Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
    );
}

export async function GET() {
    const URL = process.env.NEXT_PUBLIC_URL as string;
    return Response.json({
        "accountAssociation": {
            "header": "eyJmaWQiOjIxNjM1OCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDg4MzgzNGYwNTMyNTRhNGE3OUEwNmYzMmNGQ2RGNThFZTNCNDgxOUUifQ",
            "payload": "eyJkb21haW4iOiJiYXNlYXBwNTA1MC52ZXJjZWwuYXBwIn0",
            "signature": "DOGoI+ueFCpcU8kLtHr6FZNbiKz1M2GrrfbjVIIjHuZUhCAjtAl/TOe2Qg51VkJh9pw7us98nBWt6uvo1xp+Pxw="
        },
        "baseBuilder": {
            "allowedAddresses": ["0xCa2b01D0552A30F3619b53b2b59aA3d4358f1Fbf"] // add your Base Account address here
        },
        "miniapp": {
            "version": "1",
            "name": "5050taixiu",
            "homeUrl": "https://baseapp5050.vercel.app/",
            "iconUrl": "https://baseapp5050.vercel.app/5050.png",
            "imageUrl": "https://baseapp5050.vercel.app/5050.png",
            "buttonTitle": "Play 50-50 Game",
            "splashImageUrl": "https://baseapp5050.vercel.app/5050.png",
            "splashBackgroundColor": "#000000",
            "webhookUrl": "https://ex.co/api/webhook",
            "subtitle": "Fast, fun, social",
            "description": "CHOOSE ODD OR EVEN • PLACE YOUR BET • LET THE BLOCKCHAIN DECIDE YOUR FATE!",
            "screenshotUrls": [
                "https://baseapp5050.vercel.app/ss1.png",
                "https://baseapp5050.vercel.app/ss2.png",
                "https://baseapp5050.vercel.app/ss3.png"
            ],
            "primaryCategory": "social",
            "tags": ["example", "miniapp", "baseapp"],
            "heroImageUrl": "https://baseapp5050.vercel.app/5050.png",
            "tagline": "Play instantly",
            "ogTitle": "5050 Game taixiu Mini App",
            "ogDescription": "Challenge friends in real time.",
            "ogImageUrl": "https://baseapp5050.vercel.app/5050.png",
            "noindex": true
        }
    }); // see the next step for the manifest_json_object
}