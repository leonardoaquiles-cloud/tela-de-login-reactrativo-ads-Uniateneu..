import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- API Routes ---
  
  // Mock Data for API
  const stories = [
    {
      id: 1,
      title: 'The Art of Minimalism',
      category: 'Design',
      author: 'Elena Vance',
      excerpt: 'Discover how less can be more in modern architecture and lifestyle.',
      image: 'https://picsum.photos/seed/minimal/800/1000',
      readTime: '5 MIN READ',
    },
    {
      id: 2,
      title: 'Urban Echoes',
      category: 'Photography',
      author: 'Marcus Thorne',
      excerpt: 'Capturing the silent stories of the city at dawn.',
      image: 'https://picsum.photos/seed/urban/800/1000',
      readTime: '8 MIN READ',
    },
    {
      id: 3,
      title: 'Future of AI',
      category: 'Technology',
      author: 'Sarah Chen',
      excerpt: 'How generative models are reshaping the creative landscape.',
      image: 'https://picsum.photos/seed/tech/800/1000',
      readTime: '4 MIN READ',
    },
    {
      id: 4,
      title: 'Scent of Rain',
      category: 'Nature',
      author: 'Julian Moss',
      excerpt: 'The chemistry and poetry behind the smell of petrichor.',
      image: 'https://picsum.photos/seed/rain/800/1000',
      readTime: '6 MIN READ',
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'security',
      title: 'New login detected',
      message: 'A new sign-in was detected from a Chrome browser on a MacOS device in London, UK.',
      time: '2 mins ago',
      unread: true,
      icon: 'Shield',
      color: 'primary'
    },
    {
      id: 2,
      type: 'content',
      title: 'New story available in Architecture',
      message: 'Discover "The Minimalist Retreat," our latest exploration into subterranean living spaces.',
      time: '15 mins ago',
      unread: true,
      icon: 'Compass',
      color: 'secondary'
    }
  ];

  app.get("/api/stories", (req, res) => {
    console.log("GET /api/stories");
    res.setHeader('Content-Type', 'application/json');
    res.json(stories);
  });

  app.get("/api/search", (req, res) => {
    const query = (req.query.q as string || "").toLowerCase();
    console.log(`GET /api/search?q=${query}`);
    const filtered = stories.filter(s => 
      s.title.toLowerCase().includes(query) || 
      s.category.toLowerCase().includes(query)
    );
    res.setHeader('Content-Type', 'application/json');
    res.json(filtered);
  });

  app.get("/api/notifications", (req, res) => {
    console.log("GET /api/notifications");
    res.setHeader('Content-Type', 'application/json');
    res.json(notifications);
  });

  app.get("/api/profile", (req, res) => {
    console.log("GET /api/profile");
    res.setHeader('Content-Type', 'application/json');
    res.json({
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      membership: "Premium Indigo Member",
      joined: "March 2023",
      location: "Seattle, WA",
      avatar: "https://picsum.photos/seed/avatar/300/300"
    });
  });

  // --- Vite Middleware ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
