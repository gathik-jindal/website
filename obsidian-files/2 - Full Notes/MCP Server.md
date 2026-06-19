21st May '26, 02:11pm

Status: #ProperNotes #InProgress

Tags: [[AI]] [[LLMs]] 

# MCP Server

An MCP server is a bridge between AI models and external tools or data sources that the AI wants to interact with. In simple terms it acts like an API (users to tool) but for LLMs/AI with caveats involved. This helps AI agents to interact with the task environment.

Let's imagine it this way:

```
AI agent has to delete a task -> develop mcp server to interact with the shell -> expose the API to this AI -> AI sends command to delete file
```

> [!note] MCP server can be separate for each tool or grouped to maintain modularity, security  and performance

The AI model generates intent based on the task it, uses its MCP client to talk to the server and processes the results returned by the client (client gets the results from the server). The MCP server has the tool-specific logic and performs the task.

## Isn’t That What REST APIs Do?

The [medium article](https://medium.com/@vivekps143/from-what-is-an-mcp-server-to-deep-understanding-a-real-human-journey-of-learning-3b77698a99bd) talks about this perfectly, "Now THIS one bothered me.

I’ve worked with APIs. Why not just hit them directly?

Then Grok explained:

- REST APIs are all over the place — OAuth here, tokens there, XML, JSON, various formats.
- An AI has to be taught each API — the headers, the params, error codes.

But with MCP:

- The AI sends ONE standard format
- The MCP server knows the REST API and does the messy translation

So the AI says:
```mcp
{  
  "tool": "github",  
  "action": "create_issue",  
  "params": {  
    "repo": "my/project",  
    "title": "Bug"  
  }  
}
```

…and the MCP server figures out the endpoint, handles tokens, formats the call.

That’s when I finally got it:  
**MCP is like a universal remote control.** The AI just points and says what it wants."

---

MCP server's are powerful for mainly 4 reasons:
 - **USB-C of AI Tools**: Before the industry faced an "N x M" problem: connecting 10 different AI models to 10 different developer tools required 100 custom integrations.
 - **Eradicating the knowledge cutoff**: AI agents can now actively fetch what they need.
 - **Turning Chatbots into Agents**: MCP doesn't just let AI _read_ data; it lets it act. An MCP server exposes microservices directly to the LLM.
 - **Extreme Context Efficiency**: Stuffing an entire database or API documentation into an AI's context window is slow and incredibly expensive. MCP allows for "progressive disclosure."

## Are MCP server really that great?

Some AI projects do not support MCP _natively_. OpenClaw for example does not, one needs to use an extension `MCPorter` that converts MCP commands to a CLI interface that OpenClaw can interact with.

The architectural choice to prioritize native CLI and built-in tools over MCP was driven by three primary challenges: [[1](https://www.youtube.com/watch?v=JD1qsessf7Y&t=25), [2](https://www.linkedin.com/posts/sylvainkalache_developers-are-moving-away-from-mcp-and-getting-activity-7435680087242592256-29bL)]

- **Token Bloat and Context Rot:** Loading MCP servers requires passing heavy instructions and schemas to the AI. Describing tools for an MCP server can consume up to 15,000 tokens, degrading context windows, whereas a CLI help text takes around 300 tokens. [[1](https://www.linkedin.com/posts/sylvainkalache_developers-are-moving-away-from-mcp-and-getting-activity-7435680087242592256-29bL), [2](https://www.youtube.com/watch?v=JD1qsessf7Y&t=25)]
- **System Fragility:** MCP servers are highly opinionated and dictate _how_ an agent must use a tool, which limits flexibility. By contrast, LLMs are deeply trained on CLI syntax and documentation, allowing agents to improvise and compose commands natively. [[1](https://www.youtube.com/watch?v=JD1qsessf7Y&t=25)]
- **Security & Sandboxing:** Many third-party MCP servers are unofficial and pose prompt injection risks in enterprise environments, whereas CLIs rely on mature, proven OS-level security. [[1](https://www.youtube.com/watch?v=JD1qsessf7Y&t=25)]

# References
My curiosity and AI
https://medium.com/@vivekps143/from-what-is-an-mcp-server-to-deep-understanding-a-real-human-journey-of-learning-3b77698a99bd
https://www.youtube.com/watch?v=JD1qsessf7Y