import {React,useState}  from "react";
import Searchbar from"../../components/Searchbar/Searchbar"  
import "./Dashboard.css";
const Dashboard = (props) => {
    const [searchData, setSearchData] = useState([]);
    const [qaList, setQaList] = useState([]);

    const handleSearchData = (data) => {
      console.log('Received from child:', data);
      setSearchData([...searchData,data]);
    };

    return (
        

        <div>
      <div className="qa-container">
      <h2 className="qa-title">Q&A History</h2>

      <div className="qa-list">
        {searchData.map((qa, index) => (
          <div key={index} className="qa-item">
            {/* Question aligned to the right */}
            <div className="qa-question">
              <p>{qa.question}</p>
            </div>

            {/* Answer aligned to the left and close to the question */}
            <div className="qa-answer">
              <p>{qa.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
<Searchbar  currentUser={props.currentUser} onSearch={handleSearchData}/>
        </div>
    );

}

export default Dashboard;
