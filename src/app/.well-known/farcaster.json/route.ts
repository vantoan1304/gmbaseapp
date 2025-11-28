function withValidProperties(properties: Record<string, undefined | string | string[]>) {
    return Object.fromEntries(
        Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
    );
}

export async function GET() {
    const URL = process.env.NEXT_PUBLIC_URL as string;
    return Response.json({
          "accountAssociation": {
            "header": "eyJmaWQiOjIxNjM1OCwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDkyMENlN2Q5NjVhYjY0OEUyNDE1NDE3NUZiMjE3NjQ3MEYxMzRhMzkifQ",
            "payload": "eyJkb21haW4iOiJnbWJhc2VhcHAteHg4NC52ZXJjZWwuYXBwIn0",
            "signature": "RYcFzSj88Zlh9emj/8YJzcfKOfHgonb/IlSuI9MhTaAXo2umyCvcE2Q/a2MWMy+QIUaJOSpyfbgBApesVzqsURw="
        },
        "baseBuilder": {
            "allowedAddresses": ["0xED3498e7Be625CB2Ba9747a53086211f4CF1A0f9"] // add your Base Account address here
        },
        "miniapp": {
            "version": "1",
            "name": "GMBase",
            "homeUrl": "https://gmbaseapp-xx84.vercel.app/",
            "iconUrl": "https://gmbaseapp-xx84.vercel.app/5050.png",
            "imageUrl": "https://gmbaseapp-xx84.vercel.app/5050.png",
            "buttonTitle": "GMBase Miniapp",
            "splashImageUrl": "https://gmbaseapp-xx84.vercel.app/5050.png",
            "splashBackgroundColor": "#000000",
            "webhookUrl": "https://ex.co/api/webhook",
            "subtitle": "Fast, fun, social",
            "description": "CHOOSE ODD OR EVEN • PLACE YOUR BET • LET THE BLOCKCHAIN DECIDE YOUR FATE!",
            "screenshotUrls": [
                "https://gmbaseapp-xx84.vercel.app/ss1.png",
                "https://gmbaseapp-xx84.vercel.app/ss2.png",
                "https://gmbaseapp-xx84.vercel.app/ss3.png"
            ],
            "primaryCategory": "social",
            "tags": ["example", "miniapp", "baseapp"],
            "heroImageUrl": "https://gmbaseapp-xx84.vercel.app/5050.png",
            "tagline": "Play instantly",
            "ogTitle": "GMBase Miniapp",
            "ogDescription": "Active Base & Farcaster.",
            "ogImageUrl": "https://gmbaseapp-xx84.vercel.app/5050.png",
            "noindex": true
        }
    }); // see the next step for the manifest_json_object
}