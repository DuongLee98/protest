pragma solidity ^0.4.11;

contract Group
{
    uint256 id = 1000;
    
    uint256 [] ids;
    
    mapping (uint256 => string) name;
    mapping (string => uint256) gid;
    mapping (string => bool) existname;
    mapping (uint256 => bool) existid;
    mapping (uint256 => uint256) index;
    
    function addGroup(string n) payable public 
    {
        require(existname[n] == false);
        name[id] = n;
        index[id] = ids.push(id)-1;
        gid[n] = id;
        existid[id] = true;
        existname[n] = true;
        id++;
    }
    
    function editGroup(uint256 i, string n) payable public
    {
        require(existid[i] == true);
        require(existname[n] == false);
        existname[name[i]] = false;
        gid[name[i]] = 0;
        
        name[i] = n;
        gid[n] = i;
        existname[n] = true;
    }
    
    function deleteGroup(uint256 i) payable public
    {
        require(existid[i] == true);
        existname[name[i]] = false;
        existid[i] = false;
        gid[name[i]] = 0;
        for (uint256 j=index[i]+1; j<getLengthId(); j++)
        {
            ids[j-1] = ids[j];
            index[ids[j]]--;
        }
        name[i] = "";
        ids.length--;
    }
    
    function getNameGroup(uint256 i) view public returns(bool, string, string)
    {
        if (existid[i] == false)
            return(false, "Id doesn't exist", "");
        return (true, "Success", name[i]);
    }
    
    function getGid(string n) view public returns(bool, string, uint256)
    {
        if (existGroup(n) == false)
            return(false, "doesn't exist", 0);
        else
            return(true, "success", gid[n]);
    }
    
    function getId(uint256 item) view public returns(bool, string, uint256)
    {
        if (item<0 || item>=getLengthId())
            return (false, "Error index", 0);
        return (true, "Success", ids[item]);
    }
    
    function getLengthId() view public returns(uint256)
    {
        return ids.length;
    }
    
    function existGroup(string n) view public returns(bool)
    {
        return existname[n];
    }
    
    function existIdGroup(uint256 i) view public returns(bool)
    {
        return existid[i];
    }
    
}
