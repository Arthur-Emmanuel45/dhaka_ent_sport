import React from 'react';
import { useState } from "react";
import './LeagueTable.css';
import UseLeagueTables from '../hooks/useLeagueTables';
import { API_BASE } from './apiBase';

const LeagueTable = () => {
    const { leagues, loading, error } = UseLeagueTables();
    const [selected, setSelected] = useState(null);

    if (loading) return <div>Loading league tables...</div>;
    if (error) return <div>Error loading leagues</div>;

    const leagueKeys = Object.keys(leagues);
    const activeKey = selected || leagueKeys[0];
    const league = leagues[activeKey];

    return (
        <div className="league-layout">
            {/* COMPETITIONS */}
            <div className="league-list">
                <h3>Competitions</h3>
                {leagueKeys.map((key) => (
                    <button
                        key={key}
                        className={`league-btn ${
                            activeKey === key ? "active" : ""
                        }`}
                        onClick={() => setSelected(key)}
                        >
                        <img src={`${API_BASE}${leagues[key].logo}`} alt="" className="league-logo" />
                        {leagues[key].name}
                    </button>
                ))}
            </div>

            {/* TABLE */}
            <div className="league-table">
                <div className='league-table-header'>
                    <img src={`${API_BASE}${league.logo}`} alt={league.name} />
                    <h3>{league.name}</h3>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Pos</th>
                            <th>Team</th>
                            <th>P</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>F</th>
                            <th>A</th>
                            <th>GD</th>
                            <th>Pts</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {league.teams.map(t => {
                            const goalDiff = t.goalsfor - t.goalsAgainst;
                            const loss = t.win - t.draw;
                            return (
                                <tr
                                    key={t.pos}
                                    className={
                                    t.pos <= 4
                                        ? "top-four"
                                        : t.pos >= 18
                                        ? "relegation"
                                        : ""
                                    }
                                >
                                    <td>{t.pos}</td>
                                    <td>{t.team}</td>
                                    <td>{t.played}</td>
                                    <td>{t.win}</td>
                                    <td>{t.draw}</td>
                                    <td>{loss}</td>
                                    <td>{t.goalsfor}</td>
                                    <td>{t.goalsAgainst}</td>
                                    <td className={goalDiff > 0 ? "gd-positive" : "gd-negative"}>
                                        {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
                                    </td>
                                    <td>{t.points}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LeagueTable;
