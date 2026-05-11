import { useState, useEffect } from 'react'

function App() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch feed from backend API
    fetch('http://localhost:8080/api/feed')
      .then(res => res.json())
      .then(data => {
        // If data is empty but we want to show something for demo
        if (data.length === 0) {
          setArticles([
            {
              id: 1,
              title: "React 19 RC is Here",
              url: "https://react.dev",
              summary: "React 19 Release Candidate is now available with new features like Actions, useActionState, and improved concurrent rendering.",
              category: "Frontend",
              source: "React Blog",
              publishedAt: new Date().toISOString()
            },
            {
              id: 2,
              title: "The Future of Spring Boot 4.0",
              url: "https://spring.io",
              summary: "Spring Boot 4.0 brings major enhancements to native compilation and memory footprint reduction.",
              category: "Backend",
              source: "Spring Blog",
              publishedAt: new Date(Date.now() - 3600000).toISOString()
            }
          ])
        } else {
          setArticles(data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch articles:", err)
        setLoading(false)
      })
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    }).format(date)
  }

  return (
    <div className="container">
      <header className="header">
        <h1>DevFeed</h1>
        <p>AI-Curated Developer News & Trends</p>
      </header>

      {loading ? (
        <div className="loading">Curating your personalized feed...</div>
      ) : (
        <div className="feed-grid">
          {articles.map(article => (
            <article key={article.id} className="article-card">
              <div className="article-meta">
                <span className="article-source">{article.source}</span>
                <span className="article-date">{formatDate(article.publishedAt)}</span>
              </div>
              <h2 className="article-title">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h2>
              {article.category && (
                <span className="article-category">{article.category}</span>
              )}
              <p className="article-summary" style={{marginTop: '1rem'}}>
                {article.summary || (article.content ? article.content.replace(/<[^>]*>/g, '') : '내용 없음')}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
