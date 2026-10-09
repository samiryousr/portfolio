const tickerItems = [
  'DESIGN-LED DEVELOPMENT',
  'NEXT.JS & TYPESCRIPT',
  'THOUGHTFUL DIGITAL PRODUCTS',
  'BUILT FOR THE MODERN WEB',
];

function TickerContent() {
  return (
    <span className="portfolio-ticker-content">
      {tickerItems.map((item) => (
        <span className="portfolio-ticker-item" key={item}>
          <span className="portfolio-ticker-mark" aria-hidden="true">
            +
          </span>
          {item}
        </span>
      ))}
    </span>
  );
}

export default function PortfolioTicker() {
  return (
    <div className="portfolio-ticker" aria-label={tickerItems.join(' · ')}>
      <div className="portfolio-ticker-track" aria-hidden="true">
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  );
}
