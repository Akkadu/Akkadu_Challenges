# Full Stack Challenge

> A Full Stack engineer should be comfortable writing deployable server code, working with external resources (databases, apis, etc), and drafting user interfaces to create complete, deployable apps from scratch.

## Clone this Repo

1. `git clone git@github.com:Akkadu/Akkadu_Challenges.git`
2. `gco -b [challenge-name/your-name]`
3. `cd Akkadu_Challenges/full-stack-engineer/submissions`
4. `mkdir [your-name] && cd $_`

## Choose a Challenge

- 💬 **Real Time Chat App**
  > Create a real-time chat application on the web that is able to broadcast messages to multiple clients.
  - Isn't required to save data
  - Should be real time (low latency)
  - Users should be able to join separate rooms
  - Should be able to distinguish from messages sent and messages received
  - Messages should have time stamps
  - User should be able to set their user name
  - Messages should include sender's user name

- ✅ **Product Review API**
  > Create a product review application on the web where a user can create, view, update, and delete reviews to a set of products.
  - Includes persistent data storage (database)
  - User should be able to add, update, and delete reviews on at least 3 products
  - Product reviews should immediately respond to changes
  - Product reviews should include at least name of user, rating, timestamp, and review text

- 🖼 **Image Processor API**
  > Create an image processing application on the web where a user can send images to a server that sends back the processed image in a downloadable format according to a user's specifications.
  - Isn't required to save data
  - User should be able to submit their own image
  - There should be at least 3 filters/effects/processing functions a user can choose from
  - User should be able to compare original image with processed image
  - Image should be downloadable

### All Challenges Should Include

- 📱 Mobile-responsive UI to interact with APIs
- 👾 Server code that can be deployed and run on a server
- 🛰 Publicly accessible APIs

*NOTE: Feel free to use boilerplates or starter code according to your preference (we would use [create-nuxt-app][create-nuxt-app] or [express-generator][express-generator], you can use whatever you're comfortable with, as long as the challenge is completed to the specification)*

## Open a PR

- Go to Github and [open a new pull request][open-pull-request] from your branch to master.
- Fill out the [pull request template][pull-request-template] and assign [me][pterobyte] as a reviewer.
- I'll add my comments, deploy it, test it, and approve or request changes based on my experience.

If you have any questions regarding these challenges or have suggestions/feedback, feel free to email me at jt@akkadu-team.com 🤓

Go forth and hammer out some bangin new web app! 🔨

[create-nuxt-app]: https://nuxtjs.org/guide/installation/
[express-generator]: https://expressjs.com/en/starter/generator.html
[open-pull-request]: https://github.com/Akkadu/Akkadu_Challenges/compare
[pull-request-template]: https://github.com/Akkadu/Akkadu_Challenges/blob/master/.github/pull_request_template.md
[pterobyte]: https://github.com/Pterobyte
