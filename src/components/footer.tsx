
const Footer = () => {
  return (
    <div className="container">
    <ul>
      <li>
        <button
          onClick={() => window.scrollTo(0, 0)}
          id="myBtn"
          
          title="Back to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-up"
            viewBox="0 0 16 16"
          >
            <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
          </svg>
          &ensp; Back to top
        </button>
      </li>
      <li>
        <a href="https://github.com/MrRobotIOI" target="_blank">
          My Github
        </a>
      </li>
      <li>
        <a href="https://mrrobotioi.github.io/home/" target="_blank">
          My Portfolio
        </a>
      </li>
      <li id="madeby">
        <a href="https://mrrobotioi.github.io/home/" target="_blank">
          <span id="madebystyle">Made by Zed</span>
        </a>
      </li>
    </ul>
  </div>
  );
};

export default Footer;
