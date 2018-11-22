pragma solidity ^0.4.11;

contract Student
{
    string [] users;
    struct info
    {
        string pass;
        string name;
        string phone;
        bool value;
    }
    mapping (string => info) data;
    mapping (string => uint256) id;
    
    function addUser(string u, string pw, string n, string p) public payable
    {
        require(!userExist(u));
        data[u].pass = pw;
        data[u].name = n;
        data[u].phone = p;
        data[u].value = true;
        id[u] = users.push(u) - 1;
    }
    
    function deleteUser(string u) public payable
    {
        require(userExist(u));
        data[u].pass = "";
        data[u].name = "";
        data[u].phone = "";
        data[u].value = false;
        for (uint256 i=id[u]+1; i<getLengthUser(); i++)
        {
            users[i-1] = users[i];
            id[users[i]]--;
        }
        users.length--;
        id[u] = 0;
    }
    
    function editUser(string u, string pw, string n, string p) public payable
    {
        require(userExist(u));
        data[u].pass = pw;
        data[u].name = n;
        data[u].phone = p;
    }
    
    function setPassUser(string u, string pw) public payable
    {
        require(userExist(u));
        data[u].pass = pw;
    }
    
    function setNameUser(string u, string n) public payable
    {
        require(userExist(u));
        data[u].name = n;

    }
    
    function setPhoneUser(string u, string p) public payable
    {
        require(userExist(u));
        data[u].phone = p;

    }
    
    function getPassUser(string u) public view returns (bool, string, string)
    {
        if (userExist(u) == false)
            return (false, "User doesn't exist", "");
        return (true, "Success", data[u].pass);
    }
    
    function getNameUser(string u) public view returns (bool, string, string)
    {
        if (userExist(u) == false)
            return (false, "User doesn't exist", "");
        return (true, "Success", data[u].name);
    }
    
    function getPhoneUser(string u) public view returns (bool, string, string)
    {
        if (userExist(u) == false)
            return (false, "User doesn't exist", "");
        return (true, "Success", data[u].phone);
    }
    
    function getLengthUser() public view returns(uint256)
    {
        return users.length;
    }
    
    function getUser(uint256 i) public view returns(bool, string, string)
    {
        if (getLengthUser()==0 || i>getLengthUser()-1 || i<0)
            return (false, "wrong index", "");
        return (true, "Success", users[i]);
    }
    
    function userExist(string u) public view returns(bool)
    {
        return data[u].value;
    }
    
}
