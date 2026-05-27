15th May '26, 07:13am

Status: #ProperNotes #InProgress 

Tags: [[Web Dev]] [[Hosting]]

# Website Hosting

First, lets talk about the ***static*** hosting and ***dynamic*** websites. In short, "A **static website** serves pre-built, fixed content that remains the same for every visitor. In contrast, a **dynamic website** generates content in real-time, often pulling data from a database to show unique information based on user actions or preferences".

### Static Website

A static website is a website that displays content that is same for every user. Meaning this content is pre-built and sent immediately when anyone requests for it. This content rarely changes over time and remains static.

Static websites do not communicate with a server or database. This is useful if we want to show information that is limited and does not change over time (or changes rarely).

Examples of this would be like a Website's home page when a new user open the website for the first time. This homepage does not change for every user specifically (it may change though based off region but you get the point).

### Dynamic Websites

A dynamic website communicates with a database or server and displays different content to different users. This website maybe pre-built and stored in the server, or built when requested for.

Dynamic websites communicate with a server or database to curate content for a specific group of users. The algorithm that curates this content is done on a server, but the time at which this is done can differ for different architectures. There are mainly three approaches to this.

#### The "Database + API" Approach

**Known as: Client-Side Rendering (CSR) or Single Page Applications (SPA)**

In this scenario, the "website" itself is technically a collection of static files (HTML, CSS, and JavaScript) sitting on a server. However, when a user visits the site:

- The browser downloads the static shell.
- The **JavaScript** then wakes up and makes **API calls** to a database/server.
- The page updates "dynamically" without a full refresh.

> **Example:** Your Twitter or Facebook feed. The layout loads instantly, but your actual posts "pop in" a second later after the API call finishes.

#### The "Compiled at Source" Approach

**Known as: Static Site Generation (SSG)**

Instead of the database being queried every time a user visits, the "query" happens **only once** when the developer hits "build."

- The computer fetches data from a database or CMS.
- It injects that data into templates.
- It spits out hundreds of finished, "pre-baked" HTML files.
- **The Result:** The end user gets a lightning-fast site that has no active connection to a database.

> **Example:** A high-end tech blog or documentation site (like Stripe or React docs). If they want to change a typo, they have to "re-compile" and re-deploy the whole site.

#### The Classic "Dynamic" Approach

**Known as: Server-Side Rendering (SSR)**

We can't forget the original way "dynamic" worked (and still works for sites like Amazon).

- The website is **neither** pre-compiled **nor** just a static shell with APIs.
- Instead, every time you click a link, a server builds a custom HTML page _on the fly_ specifically for you and sends it over.

---

Now that we have gone over the different types of websites, we can start talking about how websites or more specifically webpages. Based on the division we made above there are different servers that help us achieve this.

## GitHub Pages: The "Hard-Drive" Model

GitHub Pages is a **Static File Server**.

- **The Technology:** It essentially functions like a high-performance hard drive connected to the internet. When a user visits your site, GitHub’s servers (Nginx) simply find the pre-written `.html` file and send it over.
- **No Runtime:** There is no "engine" running on the server. You cannot run Python, Node.js, or PHP code. If your site needs a database, it has to be handled via a third-party API from the browser side (Client-side).
- **Edge Delivery:** It uses a global Content Delivery Network (CDN) to cache these files closer to users, but the source is always a static snapshot of your repository.

## WordPress Hosting: The "Request-Response" Model

Traditional WordPress hosting (Shared, VPS, or Managed --- we will talk about this later on) is a **Persistent Server Environment**.

- **The Technology:** This uses the **LAMP/LEMP stack** (Linux, Apache/Nginx, MySQL, PHP).
- **Dynamic Generation:** Unlike GitHub, the page doesn't exist until someone asks for it. When a user hits your URL, the server wakes up, runs **PHP code**, queries a **SQL database** to get your posts/comments, assembles them into an HTML string, and then sends it to the user.
- **Persistent State:** The server is "always on" and maintains a constant connection to a database. This allows for complex server-side logic like user logins, shopping carts, and real-time content updates without rebuilding the whole site.

## Vercel: The "Atomic/Serverless" Model

Vercel uses **Serverless & Edge Infrastructure**, sitting in a middle ground between the two above.

Just bear with the explanation below, we'll dumb it down after this.

- **The Technology:** Vercel doesn't use "a server" in the traditional sense. It uses **Serverless Functions** (AWS Lambda) and **Edge Middleware**.
- **Hybrid Architecture:**
    - **Static Parts:** Like GitHub, it serves pre-built files from a global CDN (a global cache network).
    - **Dynamic Parts:** When you need a "brain" (like a login or an API), Vercel spins up a tiny, temporary container (a Lambda function) to run that specific piece of code, then shuts it down immediately.
- **The Difference:** While WordPress has a server running 24/7, Vercel’s "servers" only exist for the milliseconds it takes to process your request. This is why it scales almost infinitely but requires a different way of thinking about databases (usually requiring "Serverless Databases" like PlanetScale or Neon).

# References
My curiosity aided by Google, Gemini.