pragma solidity ^0.4.11;

contract Join
{
    uint8 none = 0;
    uint8 accept = 1;
    uint8 join = 2;
    uint8 add = 3;
    uint8 urefuse = 4;
    uint8 grefuse = 5;
    
    mapping (string => mapping (uint256 => uint8)) status;
    mapping (string => uint256 []) listgroup;
    mapping (string => mapping (uint256 => uint256)) indexgroup;
    mapping (uint256 => string []) listuser;
    mapping (uint256 => mapping(string => uint256)) indexuser;
    
    function addUser(string u, uint256 g) payable public
    {
        require(status[u][g] != accept);
        require(status[u][g] != add);
        if (status[u][g] == join)
        {
            status[u][g] = accept;
        }
        else if (status[u][g] == none)
        {
            status[u][g] = add;
            indexuser[g][u] = listuser[g].push(u) - 1;
            indexgroup[u][g] = listgroup[u].push(g) -1;
        }
        else if (status[u][g] == urefuse)
        {
            status[u][g] = add;
            indexgroup[u][g] = listgroup[u].push(g) -1;
        }
    }
    
    function joinGruop(string u, uint256 g) payable public
    {
        require(status[u][g] != accept);
        require(status[u][g] != join);
        if (status[u][g] == add)
        {
            status[u][g] = accept;
        }
        else if (status[u][g] == none)
        {
            status[u][g] = join;
            indexuser[g][u] = listuser[g].push(u) - 1;
            indexgroup[u][g] = listgroup[u].push(g) -1;
        }
        else if (status[u][g] == grefuse)
        {
            status[u][g] = join;
            indexuser[g][u] = listuser[g].push(u) - 1;
        }
    }
    
    function userRefuse(string u, uint256 g) payable public
    {
        require(status[u][g] != none);
        require(status[u][g] != urefuse);
        if (status[u][g] == join || status[u][g] == accept)
        {
            deleteUser(u, g);
            deleteGroup(u, g);
            status[u][g] = none;
        }
        else if (status[u][g] == add)
        {
            deleteGroup(u, g);
            status[u][g] = urefuse;
        }
        else if (status[u][g] == grefuse)
        {
            deleteUser(u, g);
            status[u][g] = none;
        }
    }
    
    function groupRefuse(string u, uint256 g) payable public
    {
        require(status[u][g] != none);
        require(status[u][g] != grefuse);
        if (status[u][g] == add || status[u][g] == accept)
        {
            deleteUser(u, g);
            deleteGroup(u, g);
            status[u][g] = none;
        }
        else if (status[u][g] == join)
        {
            deleteUser(u, g);
            status[u][g] = grefuse;
        }
        else if (status[u][g] == urefuse)
        {
            deleteGroup(u, g);
            status[u][g] = none;
        }
    }
    
    function deleteUser(string u, uint256 g) payable public
    {
        require(status[u][g] != none);
        require(status[u][g] != grefuse);
        for (uint256 i=indexuser[g][u]+1; i<getLengthUser(g); i++)
        {
            listuser[g][i-1] = listuser[g][i];
            indexuser[g][listuser[g][i]]--;
        }
        listuser[g].length--;
    }
    
    function deleteGroup(string u, uint256 g) payable public
    {
        require(status[u][g] != none);
        require(status[u][g] != urefuse);
        for (uint256 i=indexgroup[u][g]+1; i<getLengthGroup(u); i++)
        {
            listgroup[u][i-1] = listgroup[u][i];
            indexgroup[u][listgroup[u][i]]--;
        }
        listgroup[u].length--;
    }
    
    function getLengthUser(uint256 g) view public returns(uint256)
    {
        return listuser[g].length;
    }
    
    function getLengthGroup(string u) view public returns(uint256)
    {
        return listgroup[u].length;
    }
    
    function getGroup(string u, uint256 i) view public returns(bool, string, uint256)
    {
        if(i < 0 && i>=listgroup[u].length)
            return(false, "index error", 0);
        return (true, "success", listgroup[u][i]);
    }
    
    function getUser(uint256 g, uint256 i) view public returns(bool, string, string)
    {
        if(i < 0 && i>=listuser[g].length)
            return(false, "index error", "");
        return (true, "success", listuser[g][i]);
    }
    
    function getStatus(string u, uint256 g) view public returns(uint256)
    {
        return status[u][g];
    }
}
