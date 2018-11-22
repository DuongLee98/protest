pragma solidity ^0.4.11;

contract Manage
{
    struct info
    {
        bool status;
        string date;
    }
    mapping(string => uint256[]) listgroup;
    mapping(string => mapping(uint256 =>info)) data;
    mapping(string => mapping(uint256 => uint256)) index;
    mapping(uint256 => string) teacher;
    mapping(uint256 => bool) groupexist;
    
    function addManage(string u, uint256 g, string d) payable public
    {
        require(data[u][g].status == false);
        data[u][g].date = d;
        index[u][g] = listgroup[u].push(g)-1;
        teacher[g] = u;
        data[u][g].status = true;
        groupexist[g] = true;
    }
    
    function deleteManage(string u, uint256 g) payable public
    {
        require(data[u][g].status == true);
        teacher[g] = "";
        for (uint256 i = index[u][g]+1; i<getLengthListGroup(u); i++)
        {
            listgroup[u][i-1] = listgroup[u][i];
            index[u][listgroup[u][i]]--;
        }
        listgroup[u].length--;
        data[u][g].status = false;
        groupexist[g] = false; 
    }
    
    function getLengthListGroup(string u) view public returns(uint256)
    {
        return listgroup[u].length;
    }
    
    function getDate(string u, uint256 g) view public returns(bool, string, string)
    {
        if (getStatus(u, g) == false)
            return (false, "doesn't exist", "");
        return (true, "success",data[u][g].date);
    }
    
    function getTeacher(uint256 g) view public returns(bool, string, string)
    {
        if (groupExist(g) == false)
            return(false, "doesn't exist", "");
        return(true, "success", teacher[g]);
    }
    
    function getGroup(string u, uint256 i) view public returns(bool, string, uint256)
    {
        if (i<0 || i>=getLengthListGroup(u))
            return(false, "index error", 0);
        return(true, "success", listgroup[u][i]);
    }
    
    function getStatus(string u, uint256 g) view public returns(bool)
    {
        return data[u][g].status;
    }
    
    function groupExist(uint256 u) view public returns(bool) 
    {
        return groupexist[u];
    }
}
