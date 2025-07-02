To use:

- npm install
- npm run dev

PLEASE READ THIS:

Hello there and welcome to my project! My name is Jaeden and I'm here to introduce you to my code. This is a Vite, React, Typescript and Tailwind application using shadcn components. This project is plain in looks but should meet all criteria and be fully responsive to all screen sizes.

I'm not ashamed to admit that I have weaknesses as a developer and hit quite a few bumps in the road with this project. Github auth errors in my terminal, broken npm packages and the deadly CORS errors. Handling CORS errors isn't something I've done before so I had to educate myself on how to handle them. How that process went will be detailed below and it will explain why backup-data.tsx exists.

The first and most straight forward answer for me was to create a vercel proxy. You can view the code for that [here](https://github.com/Jaedentw/cors-proxy-vercel) and the disapointing result [here](https://cors-proxy-vercel-jaedentws-projects.vercel.app/api/fruits). Right away it didn't work, and no matter what adjustments I made in the request I got the same response, 403 forbidden. I tested my headers to make sure the custom x-api-key property was making it through using [Webhook](https://webhook.site), I was certain that had to be the problem but everything came through fine. An additional test on [Postman](https://www.postman.com/) confirmed that even with the headers something was going wrong. I resorted to AI assistance, hoping that it could see something I couldn't. It had me run through the entire diagnostic process again, and try a curl request in the terminal (curl -H "x-api-key: fruit-api-challenge-2025" https://fruity-proxy.vercel.app/api/fruits) which ultimately had the same result as the vercel request, 403 forbidden. All the AI had to say was this: ![🔒 Conclusion: The API is hard-coded to accept only requests from localhost and nothing else.](/src/assets/gpt.png) Which doesn't seem likely

I was temped to just call my current co-workers and hope that they'd spot something I couldn't but seeing as this is an interview I wanted to find a way to do this on my own. After all, you're assessing my skills and not theirs. I will be doing so after submission as I desperately want to figure this out.

As hard as it is to admit I ultimately I couldn't find a way around this and committed a programming sin, I hardcoded data. Given application topic and usage it's unlikely that the dataset would ever change, but that's not an acceptible reason to do that. In an actual work environment and deployment this wouldn't be okay. I was going to reach out to you/your team for more information, potentially a hint if I was lucky but it was stated in the description that the state of the CORS errors was intentional and is apart of the assessment. Currently if you run this project locally it will still use the api, but on production it will attempt fetching and then default to using the array in backup-data.tsx. I know this will likely put me out of the running for this role but I truly hope you'll still give me a chance as I've loved everything I've learned about your team thus far.

I would be very greatful to hear from you and figure out if I was on the right track and where I might have messed up. I want to learn from this experience and grow as a developer. You can contact me at: jaeden.t.west@gmail.com. I truly hope you reach out so read your feedback on what I've built.

Thank you so much for reading my wall of text and taking the time to review this project,
I hope you have a lovely day!
