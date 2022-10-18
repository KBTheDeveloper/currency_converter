type LinkType = {
  className?: string,
  href: string,
  children: React.ReactNode,
  style?: any
}
const Link = ({ className, style, href, children }: LinkType) => {
  
  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    // prevent full page reload
    event.preventDefault();
    // update url
    window.history.pushState({}, "", href);

    // communicate to Routes that URL has changed
    const navEvent: PopStateEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <a className={className} style={style} href={href} onClick={onClick}>
      {children}
    </a>
  );
};

export default Link;