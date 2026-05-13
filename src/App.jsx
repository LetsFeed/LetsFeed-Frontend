import { useState, useEffect } from 'react'

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" // Techy code placeholder

const Header = () => (
  <header className="container">
    <div className="header-top">
      <div className="header-icons">
        <span>☰</span>
        <span>🔍</span>
      </div>
      <div className="logo">LetsFeed</div>
      <button className="subscribe-btn">Subscribe</button>
    </div>
    <nav className="main-nav">
      {['Frontend', 'Backend', 'AI', 'DevOps', 'Mobile', 'Design'].map((item) => (
        <a key={item} href={`#${item.toLowerCase()}`} className="nav-item">{item}</a>
      ))}
    </nav>
  </header>
)

const ArticleCard = ({ article, type = 'standard' }) => {
  const isLarge = type === 'large'
  const isSmall = type === 'small'
  
  if (isSmall) {
    return (
      <div className="latest-item">
        <div className="latest-content">
          <h4>{article.title}</h4>
          <span className="card-meta">{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <img src={article.image || PLACEHOLDER_IMAGE} alt={article.title} />
      </div>
    )
  }

  return (
    <article className="article-item">
      <img src={article.image || PLACEHOLDER_IMAGE} alt={article.title} className="card-image" />
      <span className="section-title-small">{article.category}</span>
      <h3 className={`card-title ${isLarge ? 'card-title-large' : ''}`}>
        <a href={article.url || '#'}>{article.title}</a>
      </h3>
      {!isSmall && <p className="card-summary">{article.summary || (article.content ? article.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : '내용 없음')}</p>}
      <span className="card-meta">
        {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        {article.source && ` • ${article.source}`}
      </span>
    </article>
  )
}

const HeroSection = ({ articles }) => {
  if (articles.length === 0) return null
  
  // Try to fill the 3-column layout as best as possible
  const leftArticles = articles.slice(0, 2)
  const centerArticle = articles.length > 2 ? articles[2] : articles[0]
  const rightArticles = articles.slice(3, 8)

  return (
    <section className="hero-section container">
      <div className="hero-left">
        {leftArticles.map(art => <ArticleCard key={art.id} article={art} />)}
      </div>
      <div className="hero-center">
        {centerArticle && <ArticleCard article={centerArticle} type="large" />}
      </div>
      <div className="hero-right">
        <h3 className="latest-header">Latest</h3>
        {rightArticles.map(art => <ArticleCard key={art.id} article={art} type="small" />)}
      </div>
    </section>
  )
}

const CategorySection = ({ title, articles }) => {
  if (!articles || articles.length === 0) return null;
  
  return (
    <section className="category-section container" id={title.toLowerCase()}>
      <div className="section-header">
        <h2>{title}</h2>
        <a href={`#${title.toLowerCase()}`} className="view-all">View all »</a>
      </div>
      <div className="article-grid">
        {articles.slice(0, 4).map(art => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </section>
  )
}

function App() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8080/api/feed')
      .then(res => res.json())
      .then(data => {
        let finalData = data;
        
        // If data is empty but we want to show something for demo
        if (data.length === 0) {
          finalData = [
            { id: 1, title: "React 19 RC is Here", category: "FRONTEND", summary: "React 19 Release Candidate is now available with new features like Actions, useActionState, and improved concurrent rendering.", source: "React Blog", publishedAt: new Date().toISOString() },
            { id: 2, title: "The Future of Spring Boot 4.0", category: "BACKEND", summary: "Spring Boot 4.0 brings major enhancements to native compilation and memory footprint reduction.", source: "Spring Blog", publishedAt: new Date(Date.now() - 3600000).toISOString() },
            { id: 3, title: "Understanding LLMs in 2026", category: "AI", summary: "A deep dive into how large language models have evolved and how to integrate them into your apps.", source: "AI Weekly", publishedAt: new Date(Date.now() - 7200000).toISOString() },
            { id: 4, title: "Kubernetes Best Practices", category: "DEVOPS", summary: "Essential tips for managing and scaling your Kubernetes clusters effectively.", source: "Cloud Native", publishedAt: new Date(Date.now() - 10800000).toISOString() },
            { id: 5, title: "CSS Grid vs Flexbox", category: "FRONTEND", summary: "When to use which layout system in modern web development.", source: "CSS Tricks", publishedAt: new Date(Date.now() - 14400000).toISOString() },
            { id: 6, title: "Go 1.25 Release Notes", category: "BACKEND", summary: "New features and performance improvements in the latest Go release.", source: "Go Blog", publishedAt: new Date(Date.now() - 18000000).toISOString() },
            { id: 7, title: "Getting Started with Flutter", category: "MOBILE", summary: "Build cross-platform mobile applications efficiently with Flutter.", source: "Flutter Dev", publishedAt: new Date(Date.now() - 21600000).toISOString() },
            { id: 8, title: "Designing Accessible UIs", category: "DESIGN", summary: "Principles and practices for creating interfaces everyone can use.", source: "Design Systems", publishedAt: new Date(Date.now() - 25200000).toISOString() },
          ]
        }
        
const getFallbackImage = (category) => {
  const categoryImages = {
    'FRONTEND': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    'BACKEND': 'https://images.unsplash.com/photo-1558494949-ef010bbbb317?auto=format&fit=crop&q=80&w=800',
    'AI': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    'DEVOPS': 'https://images.unsplash.com/photo-1667372335433-03025215771d?auto=format&fit=crop&q=80&w=800',
    'MOBILE': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    'DESIGN': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800'
  };
  return categoryImages[category?.toUpperCase()] || PLACEHOLDER_IMAGE;
};

// ... inside useEffect processing ...
        // Add tech placeholder images if not present
        const processedData = finalData.map((a) => ({
          ...a,
          image: a.image || getFallbackImage(a.category)
        }))
        
        setArticles(processedData)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch articles:", err)
        setLoading(false)
      })
  }, [])

  // Extract unique categories dynamically
  const categories = [...new Set(articles.map(a => a.category?.toUpperCase()).filter(Boolean))]
  
  // Hero section takes the newest 8 items
  const heroArticles = articles.slice(0, 8)

  return (
    <div className="app">
      <Header />
      
      {loading ? (
        <div className="container" style={{padding: '5rem', textAlign: 'center'}}>Loading LetsFeed...</div>
      ) : (
        <main>
          <HeroSection articles={heroArticles} />
          
          {categories.map(category => {
            const categoryArticles = articles.filter(a => a.category?.toUpperCase() === category)
            // Only show category section if there are articles not in the hero (optional logic)
            // For now, let's just show all category articles
            return (
              <CategorySection 
                key={category} 
                title={category} 
                articles={categoryArticles} 
              />
            )
          })}
        </main>
      )}
      
      <footer className="container" style={{padding: '3rem 0', borderTop: '1px solid #eee', textAlign: 'center', color: '#999', fontSize: '0.8rem'}}>
        © 2026 LetsFeed. ALL RIGHTS RESERVED.
      </footer>
    </div>
  )
}

export default App
