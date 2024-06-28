import Header from "./components/Header";
import initialEmails from "./data/emails";
import { useState } from "react";

import "./styles/App.css";

function App() {
  const [currentEmails, setCurrentEmails] = useState(initialEmails);
  const [starredEmails, setStarredEmails] = useState(
    currentEmails.filter((email) => email.starred == true)
  );
  // eslint-disable-next-line no-unused-vars
  const [readEmails, setReadEmails] = useState(
    currentEmails.filter((email) => email.read == !true)
  );

  const [readVisibilityToggle, setReadVisibilityToggle] = useState(false);

  function toggleStar(targetEmail) {
    const updatedEmails = currentEmails.map((currentEmail) =>
      currentEmail === targetEmail
        ? { ...currentEmail, starred: !currentEmail.starred }
        : currentEmail
    );
    setCurrentEmails(updatedEmails);
    setStarredEmails(updatedEmails.filter((email) => email.starred == true));
  }

  function toggleRead(targetEmail) {}

  const readEmails = email.read == true ? 

  const emails = readVisibilityToggle == false ? currentEmails : readEmails;

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">{currentEmails.length}</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={readVisibilityToggle}
              onChange={() => {
                readVisibilityToggle == false
                  ? setReadVisibilityToggle(true)
                  : setReadVisibilityToggle(false);
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {emails.map((email) => {
          return (
            <li
              className={`email${email.read == true ? " read" : ""}`}
              key={email.id}
            >
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={() => {
                    toggleRead(email);
                  }}
                />
              </div>
              <div className="star">
                {" "}
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onChange={() => {
                    toggleStar(email);
                  }}
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          );
        })}
      </main>
    </div>
  );
}

export default App;
