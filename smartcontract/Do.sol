pragma solidity ^0.4.11;

contract Do
{
    
    mapping (string => mapping (uint256 => bool)) status;
    mapping (string => mapping (uint256 => uint256)) mark;
    mapping (string => mapping (uint256 => uint256[])) answer;
    mapping (string => uint256 []) listgroup;
    mapping (string => mapping (uint256 => uint256)) indexgroup;
    mapping (uint256 => string []) listuser;
    mapping (uint256 => mapping(string => uint256)) indexuser;
    
    function add(string u, uint256 e, uint256 m, uint256[]aw) public payable
    {
        require(status[u][e]==false);
        mark[u][e] = m;
        answer[u][e] = aw;
        indexgroup[u][e] = listgroup[u].push(e)-1;
        indexuser[e][u] = listuser[e].push(u)-1;
        status[u][e] = true;
    }
    
    function getMark(string u, uint256 e) view public returns(bool, string, uint256)
    {
        if (getStatusInDo(u, e) == false)
            return(false, "hasn't data", 0);
        return(true, "success", mark[u][e]);
    }
    
    function getLengthUserInDo(uint256 g) view public returns(uint256)
    {
        return listuser[g].length;
    }
    
    function getLengthExamInDo(string u) view public returns(uint256)
    {
        return listgroup[u].length;
    }
    
    function getExamInDo(string u, uint256 i) view public returns(bool, string, uint256)
    {
        if(i < 0 && i>=listgroup[u].length)
            return(false, "index error", 0);
        return (true, "success", listgroup[u][i]);
    }
    
    function getUserInDo(uint256 g, uint256 i) view public returns(bool, string, string)
    {
        if(i < 0 && i>=listuser[g].length)
            return(false, "index error", "");
        return (true, "success", listuser[g][i]);
    }
    
    function getStatusInDo(string u, uint256 g) view public returns(bool)
    {
        return status[u][g];
    }
    
    function getAnswer(string u, uint256 e) view public returns(bool, string, uint256[])
    {
        if (getStatusInDo(u, e) == false)
            return(false, "hasn't data", answer[u][e]);
        return(true, "success", answer[u][e]);
    }
}
