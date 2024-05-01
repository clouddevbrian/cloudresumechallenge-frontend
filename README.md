![clouddevbrian com Architecture](https://github.com/clouddevbrian/cloudresumechallenge-frontend/assets/166995717/d213899c-b088-4450-a3e4-2c86f1f3c147)
Having completed lots of pretty tough labs and tutorials, I knew it was time to put all my knowledge together in an end-to-end project.\
With only a few days free to get this completed before I would be on Holiday, I got cracking.

# Front-End
### HTML
Starting things off fairly comfortably for me was creating the rudimental side of the website just with HTML. It's true that, with Dreamweaver installed (a what-you-see-is-what-you-get [WYSIWYG] editor), I simply started off copy pasting my Microsoft Word document CV straight into a plain HTML page. In the end though, I realised, this same format wasn't going to quite work for a website and I decided to created a two column table. However, with this came a different approach to my presentation and I decided to also include some of the badges I'd earnt to help make my credentials more immediate for recruiters.

### Cascading Style Sheets (CSS)
With the raw HTML ready, I wanted to make it look snazzy, modern and appealing. Despite my previous HTML experience, I had not really touched CSS at all having self-taught when CSS wasn't quite so ubiquitous. Once I got a handle on how to determine fonts and headings, things visually began to take shape. My use of this colourful bold is again like the deployment of the badges, to clearly emphasise my credentials. I had originally gone for a diagonal gradient background, but discovered it rendered improperly on my mobile phone to my dismay, so I tried it with a simple horizontal line to satisfactory effect.

# Back-End
### S3, DNS and CDN
Phew. Ok. So now we're finally moving into the real side of things now. First thing was first - register a domain using Route 53, it wasn't too dear thankfully. The next bit was to issue SSL certificates, meaning your end-user could be sure they were accessing a legitimate domain. I used AWS's certificate manager to do this and was able to quickly add the relevant CNAME records to my domain DNS without of course forgetting to mention it had to be in US-EAST-1 aka "Global"! Cool. From here for both security hardening and enhancing end-user experience, we deploy AWS's content delivery network (CloudFront). This allowed the S3 bucket to be locked out of public access, by granting CloudFront the relevant IAM permissions to complete sync actions on it. 

### DynamoDB
This was pretty quick to set-up via the AWS portal, to be fair. 

### Lambda (& Python)
Perhaps the most time consuming part of the challenge. The first thing to sort out is, after writing your script, you realise that you don't have permission to query your DynamoDB table! So you need to add to your Lambda IAM role the full DynamoDB access. I did suffer with the CORS issue, but, due to another lab I was aware for a single function I could tick the HTTP endpoint instead of relying on the API gateway service. I ended up writing two variants of the script (using Python and the AWS SDK boto3) using both **UpdateItem** (with increment arguement) and **PutItem** commands. Why twice you ask? Well, because not being a Unix user, my natural inclination wasn't to CURL my HTTP endpoint. I had initially used the **PutItem** command with the simple *var = var + 1* logic, which worked fine when tested via the Lambda portal. However when it came time to trial the HTTP endpoint over my browser (Google Chrome), I started to notice it was invoked several times, despite still working accurately when testing it on Lambda. So off I went scripting it once again with the **UpdateItem** argument to see if the behaviour changed. Again my script worked fine in Lambda but running the HTTP endpoint on Google Chrome resulted in multiple invocations. Ha. It was at this point my suspicious turned on the browser. I open Microsoft's Edge, refresh, refresh, refresh - each time invoking once, as intended. I laughed loudly to myself. Having written code comments explaining the **PutItem** script I'd written already, in it went back in again to check and yep... that was a 2-3 hours lost to a folly. But live and learn!   

### JavaScript & HTML Integration
Now this certaintly isn't my proudest moment, but knowing that from my API studies I simply needed to trigger my HTTP endpoint and return the value in my HTML. I genuinely do avoid relying on ChatGPT as it seems unable to manage even simple queries around heavy metal music which couldn't be considered obscure in the slightest (ahem), however, I must admit it delivered for me in this instance. So along a AI query and a JavaScript API video on YouTube I was able to work out how to get the visitor counter going. I was indeed delighted knowing it was my little Lambda script interacting with the DB back-end by this point. 

### CI/DI & Infrastructure as Code
For synching my S3 bucket, rather then go with the suggestion of GitHub Actions, I decided to choose AWS CodePipeLine. This was just because I had actually done a Blue/Green deployment lab using CodePipeLine and CodeDeploy, so it was just a little bit familiar and I am pressed for time after all. I quickly created the pipeline and checked if everything updated as planned if there was a new Git push. Success! Unfortunately, as I'm out of time I've not yet Terraform'd my Lambda + DynamoDB resources but will action this as soon as I'm back in the country! 

# Next Steps
I've got two ideas currently in my mind. The first idea will be container focused project, leveraging some machine learning models from Hugging Face, all invoked by Terraform. The second project idea I have is to do something DevOps related, however the project specification remains more undefined for the moment.

#Thanks for reading! Cheers.
