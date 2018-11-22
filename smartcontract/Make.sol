pragma solidity ^0.4.11;

contract Make
{
    struct info
    {
        bool status;
        string date;
        mapping(uint256 => bool) accept;
    }
    mapping(string => uint256[]) listexam;
    mapping(string => mapping(uint256 =>info)) data;
    mapping(string => mapping(uint256 => uint256)) index;
    mapping(uint256 => string) tuser;
    mapping(uint256 => bool) existexam;
    
    function addMake(string t, uint256 e, string d) payable public
    {
        require(data[t][e].status == false);
        data[t][e].date = d;
        index[t][e] = listexam[t].push(e)-1;
        tuser[e] = t;
        data[t][e].status = true;
        existexam[e] = true;
    }
    
    function setAcceptGroupForExam(string t, uint256 e, uint256 g, bool acc) payable public
    {
        require(getStatus(t, e)==true);
        data[t][e].accept[g] = acc;
    }
    
    function getAcceptGroupForExam(string t, uint256 e, uint256 g) public view returns(bool, string, bool)
    {
        if (getStatus(t, e) == false)
            return(false, "Make doesn't exist", false);
        return(true, "success", data[t][e].accept[g]);
    }
    
    function deleteMake(string t, uint256 e) payable public
    {
        require(data[t][e].status == true);
        tuser[e] = "";
        for (uint256 i = index[t][e]+1; i<getLengthListExam(t); i++)
        {
            listexam[t][i-1] = listexam[t][i];
            index[t][listexam[t][i]]--;
        }
        listexam[t].length--;
        data[t][e].status = false;
        existexam[e] = false; 
    }
    
    function getLengthListExam(string u) view public returns(uint256)
    {
        return listexam[u].length;
    }
    
    function getDate(string u, uint256 e) view public returns(bool, string, string)
    {
        if (getStatus(u, e) == false)
            return (false, "Make doesn't exist", "");
        return (true, "success",data[u][e].date);
    }
    
    function getTeacher(uint256 e) view public returns(bool, string, string)
    {
        if (examExist(e) == false)
            return(false, "Exam doesn't exist", "");
        return(true, "success", tuser[e]);
    }
    
    function getExam(string u, uint256 i) view public returns(bool, string, uint256)
    {
        if (i<0 || i>=getLengthListExam(u))
            return(false, "index error", 0);
        return(true, "success", listexam[u][i]);
    }
    
    function getStatus(string u, uint256 e) view public returns(bool)
    {
        return data[u][e].status;
    }
    
    function examExist(uint256 u) view public returns(bool) 
    {
        return existexam[u];
    }
}
