// src/app/rules/page.js
"use client";
import React from "react";
import {
  FaFootballBall,
  FaDollarSign,
  FaUsers,
  FaVoteYea,
  FaQuestionCircle,
} from "react-icons/fa"; // Example icons

const LeaguePoliciesAndFAQ = () => {
  return (
    <div className="rules-container">
      <h1 className="title">League Policies & FAQ</h1>
      <div className="rules-list">
        <div className="rule-item">
          <FaFootballBall className="icon" />
          <div>
            <h3>What type of scoring is the league?</h3>
            <p>0.5 PPG</p>
          </div>
        </div>

        <div className="rule-item">
          <FaUsers className="icon" />
          <div>
            <h3>How is last place determined?</h3>
            <p>
              At the end of the regular season, the team with the worst record
              is the ultimate loser.
            </p>
          </div>
        </div>

        <div className="rule-item">
          <FaUsers className="icon" />
          <div>
            <h3>
              What if there are 2+ teams tied for worst record at the end of the
              season?
            </h3>
            <p>
              The team that scores the least amount of points in the first round
              of the losers bracket.
            </p>
          </div>
        </div>

        <div className="rule-item">
          <FaDollarSign className="icon" />
          <div>
            <h3>How much is the league buy-in?</h3>
            <p>$100</p>
          </div>
        </div>

        <div className="rule-item">
          <FaUsers className="icon" />
          <div>
            <h3>How big is the roster?</h3>
            <p>16, with 9 starters and 7 bench players</p>
          </div>
        </div>

        <div className="rule-item">
          <FaUsers className="icon" />
          <div>
            <h3>How many teams make the winners bracket?</h3>
            <p>6 teams. Based on overall record, no divisions.</p>
          </div>
        </div>

        <div className="rule-item">
          <FaQuestionCircle className="icon" />
          <div>
            <h3>What is the tiebreaker for playoff seeding?</h3>
            <p>Total Points For</p>
          </div>
        </div>

        <div className="rule-item">
          <FaFootballBall className="icon" />
          <div>
            <h3>What is the waiver order (if tied $FAAB bid)?</h3>
            <p>Inverse of league standings</p>
          </div>
        </div>

        <div className="rule-item">
          <FaDollarSign className="icon" />
          <div>
            <h3>How much FAAB money is there for the season?</h3>
            <p>$125</p>
          </div>
        </div>

        <div className="rule-item">
          <FaVoteYea className="icon" />
          <div>
            <h3>How many votes are required to veto a trade?</h3>
            <p>8 votes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaguePoliciesAndFAQ;
