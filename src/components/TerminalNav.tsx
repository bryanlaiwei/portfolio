const destinations = [
  { href: "#about", label: "about/" },
  { href: "#experience", label: "experience/" },
  { href: "#projects", label: "projects/" },
];

export default function TerminalNav() {
  return (
    <div className="terminal-window hero-terminal" aria-label="Portfolio section index">
      <div className="terminal-bar">
        <div className="terminal-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>bryan.wei@portfolio — zsh</span>
      </div>
      <div className="hero-terminal-body">
        <div>
          <p><span>$</span> pwd</p>
          <p className="terminal-output">~/portfolio</p>
        </div>
        <div>
          <p><span>$</span> ls</p>
          <div className="terminal-index">
            {destinations.map((destination) => (
              <a key={destination.href} href={destination.href}>{destination.label}</a>
            ))}
          </div>
        </div>
        <p className="terminal-prompt"><span>$</span><i aria-hidden="true" /></p>
      </div>
    </div>
  );
}
