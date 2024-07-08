import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ user }) => {
    const [pages, setPages] = useState([]);
    const [selectedPage, setSelectedPage] = useState('');
    const [pageStats, setPageStats] = useState({});
    const [since, setSince] = useState('');
    const [until, setUntil] = useState('');

    useEffect(() => {
        const fetchPages = async () => {
            const response = await axios.get(`https://graph.facebook.com/v20.0/${user.id}/accounts?access_token=${user.accessToken}`);
            // https://graph.facebook.com/v20.0/1477029749841879/accounts?access_token=EAAL9DbDpa8YBO00ZCZACGrD3quWCjxFu19mLXurqUz4EQdlmSZBtGJruPLwj3qzfb5kWLoSMNg5j4MS6cBN7qUnIlH0fk8jkUGJhPiCmGQQqCMt2AZCCudYgYvJ0q26PzI7tpO7YsAVVX5Hw8lpbqNLch2ZBpWpAw5iRZAsKhrGiUDxaIt8Ha1unZBEdyUpBb8gjjlHDghZAGnMMZB2EC3gZDZD`

            setPages(response.data);
        };

        fetchPages();
    }, [user]);

    const handlePageSelect = async (e) => {
        setSelectedPage(e.target.value);
        await fetchPageStats(e.target.value);
    };

    const fetchPageStats = async (pageId) => {
        const response = await axios.get(
            `https://graph.facebook.com/${pageId}/insights?metric=page_fans,page_engaged_users,page_impressions,page_actions_post_reactions_like_total&period=days_28&since=${since}&until=${until}&access_token=${user.accessToken}`
        );
        setPageStats(response.data.data);
    };

    const handleDateChange = async () => {
        if (selectedPage) {
            await fetchPageStats(selectedPage);
        }
    };

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <img src={user.picture.data.url} alt="Profile" />
            <div>
                <label>
                    Select Page:
                    <select onChange={handlePageSelect} value={selectedPage}>
                        <option value="">Select a page</option>
                        {/* {pages.map((page) => (
                            return <option key={page.id} value={page.id}>
                            {page.name}
                        </option>
                        )
                            
                        )} */}
                        {
                            pages.map((page, index) => {
                                return (
                                    <option key={index} value={page.id}>
                                        {page.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Since:
                    <input type="date" value={since} onChange={(e) => setSince(e.target.value)} />
                </label>
                <label>
                    Until:
                    <input type="date" value={until} onChange={(e) => setUntil(e.target.value)} />
                </label>
                <button onClick={handleDateChange}>Update</button>
            </div>
            {
                pageStats && (
                    <div>
                        <h2>Page Stats</h2>
                        <div>Total Followers: {pageStats[0]?.values[0]?.value}</div>
                        <div>Total Engagement: {pageStats[1]?.values[0]?.value}</div>
                        <div>Total Impressions: {pageStats[2]?.values[0]?.value}</div>
                        <div>Total Reactions: {pageStats[3]?.values[0]?.value}</div>
                    </div>
                )
            }
        </div >
    );
};

export default Dashboard;
