import Header from "./components/Header";
import initialEmails from "./data/emails";
import { useState } from "react";

import "./styles/App.css";

function App() {
  const [currentEmails, setCurrentEmails] = useState(initialEmails);
  // eslint-disable-next-line no-unused-vars

  const [readVisibilityToggle, setReadVisibilityToggle] = useState(false);
  const [currentTab, setCurrentTab] = useState("inbox");

  function toggleStar(targetEmail) {
    const updatedEmails = currentEmails.map((currentEmail) =>
      currentEmail === targetEmail
        ? { ...currentEmail, starred: !currentEmail.starred }
        : currentEmail
    );
    setCurrentEmails(updatedEmails);
  }

  function toggleRead(targetEmail) {
    const updatedEmails = currentEmails.map((currentEmail) =>
      currentEmail === targetEmail
        ? { ...currentEmail, read: !currentEmail.read }
        : currentEmail
    );
    setCurrentEmails(updatedEmails);
  }

  const starredEmails = currentEmails.filter((email) => email.starred == true);

  const unreadEmails = currentEmails.filter((email) => email.read == false);

  const starredAndUnread = starredEmails.filter((email) => email.read == false);

  const emails = //set which emails are rendered
    currentTab == "starred" //if we're on the starred tab
      ? readVisibilityToggle //check if hide read is toggled
        ? starredAndUnread //if it's toggled then only render starred and undread emails
        : starredEmails //else render only starred emails
      : readVisibilityToggle //if we're not on the starred tab check if hide unread is toggled
      ? unreadEmails //if so, then show only unread emails
      : currentEmails; //else show current emails

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item${currentTab == "inbox" ? " active" : ""}`}
            onClick={() => {
              setCurrentTab("inbox");
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{currentEmails.length}</span>
          </li>
          <li
            className={`item${currentTab == "starred" ? " active" : ""}`}
            onClick={() => {
              setCurrentTab("starred");
            }}
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
