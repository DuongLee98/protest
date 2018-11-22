pragma solidity ^0.4.11;

contract Exam
{
    struct time
    {
        string start;
        string end;
        bool setstart;
        bool setend;
    }
    
    mapping(uint256 => string) name;
    mapping(string => uint256) eid;
    
    mapping(uint256 => bool) existid;
    mapping(string => bool) existname;
    
    uint256 [] listid;
    mapping(uint256 => uint256) indexid;
    
    uint256 staticid = 10000;
    
    mapping(uint256 => string) etype;
    mapping(uint256 => string[]) question;
    mapping(uint256 => mapping(uint256 => string[])) selection;
    mapping(uint256 => uint256[]) answer;
    mapping(uint256 => time) timedo;
    mapping(uint256 => bool) epublic;
    
    mapping(uint256 => mapping(string => uint8[])) result;
    
    function addExam(string n) payable public
    {
        require(existname[n]==false);
        
        name[staticid] = n;
        eid[n] = staticid;
        
        existid[staticid] = true;
        existname[n] = true;
        
        indexid[staticid] = listid.push(staticid) - 1;
        staticid++;
    }
    
    function getLengthExam() public view returns(uint256)
    {
        return listid.length;
    }
    
    function getId(uint256 i) public view returns(bool, string, uint256)
    {
        if (i<0 || i>=getLengthExam())
            return(false, "Error index", 0);
        return(true, "Success", listid[i]);
    }
    
    function getNameOfExam(uint256 id) public view returns(bool, string, string)
    {
        if(existid[id]==false)
            return(false, "ID doesn't exist", "");
        return(true, "Success", name[id]);
    }
    
    function getIdOfExam(string n) public view returns(bool, string, uint256)
    {
        if(existname[n]==false)
            return(false, "Name doesn't exist", 0);
        return(true, "Success", eid[n]);
    }
    
    function getExistId(uint256 id) public view returns(bool)
    {
        return existid[id];
    }
    
    function getExistName(string n) public view returns(bool)
    {
        return existname[n];
    }
    
    function deleteExam(uint256 id) payable public
    {
        require(existid[id]==true);
        existname[name[id]] =  false;
        existid[id] = false;
        
        for(uint256 i = indexid[id]+1; i<listid.length; i++)
        {
            listid[i-1] = listid[i];
            indexid[listid[i-1]]--;
        }
        listid.length--;
    }
    
    function editName(uint256 id, string nn) payable public
    {
        require(existid[id] == true);
        require(existname[nn] == false);
        existname[name[id]] = false;
        name[id] = nn;
        eid[nn] = id;
        existname[nn] = true;
    }
    
    function getLengthQuestionOfExam(uint256 id) public view returns(uint256)
    {
        require(getExistId(id));
        return question[id].length;
    }
    
    function getQuestionOfExam(uint256 id, uint256 i) public view returns(bool, string, string)
    {
        if(existid[id] == false)
            return(false, "ID doesn't exist", "");
        if(i<0 || i>=getLengthQuestionOfExam(id))
            return(false, "Error index", "");
        return(true, "Success", question[id][i]);
    }
    
    function addOrSetQuestionOfExam(uint256 id, uint256 i, string nq) public payable
    {
        require(existid[id]==true);
        if(i>=0 && i<getLengthQuestionOfExam(id))
        {
            question[id][i] = nq;
        }
        else
        {
            require(i == getLengthQuestionOfExam(id));
            question[id].push(nq);
        }
    }
    
    function setLengthQuestionOfExam(uint256 id, uint256 len) public payable
    {
        require(existid[id] == true);
        question[id].length = len;
    }
    
    function existQuestionOfExam(uint256 id, uint256 s) public view returns(bool)
    {
        if(getExistId(id) == false)
            return false;
        if(s<0 || s>=getLengthQuestionOfExam(id))
            return false;
        return true;
    }
    
    function getLengthSelectionOfQuestionInExam(uint256 id, uint256 q) public view returns(uint256)
    {
        require(existQuestionOfExam(id, q));
        return selection[id][q].length;
    }
    
    function existSelectionOfQuestionInExam(uint256 id, uint256 q, uint256 s) public view returns(bool)
    {
        if (existQuestionOfExam(id, q) == false)
            return false;
        if (s<0 || s>= getLengthSelectionOfQuestionInExam(id, q))
            return false;
        return true;
    }
    
    function getSelectionOfQestionInExam(uint256 id, uint256 q, uint256 s) public view returns(bool, string, string)
    {
        if(!existSelectionOfQuestionInExam(id, q, s))
            return(false, "Selection doesn't exist", "");
        return(true, "Success", selection[id][q][s]);
    }
    
    function addOrSetSelectionOfQuestionInExam(uint256 id, uint256 q, uint256 s, string ns) public payable
    {
        require(existQuestionOfExam(id, q));
        if(s>=0 && s<getLengthSelectionOfQuestionInExam(id, q))
        {
            selection[id][q][s] = ns;
        }
        else
        {
            require(s == getLengthSelectionOfQuestionInExam(id, q));
            selection[id][q].push(ns);
        }
    }
    
    function setLengthSelectionOfQuestionInExam(uint256 id, uint256 q, uint256 l) public payable
    {
        require(existQuestionOfExam(id, q));
        selection[id][q].length = l;
    }
    
    function getAnswerOfExam(uint256 id, uint256 i) public view returns(bool, string, uint256)
    {
        if(existid[id] == false)
            return(false, "ID doesn't exist", 0);
        if(i<0 || i>=getLengthAnswerOfExam(id))
            return(false, "Error index", 0);
        return(true, "Success", answer[id][i]);
    }
    
    function getLengthAnswerOfExam(uint256 id) public view returns(uint256)
    {
        return answer[id].length;
    }
    
    function addOrSetAnswerOfExam(uint256 id, uint256 i, uint256 aw) public payable
    {
        require(existid[id]==true);
        require(aw>=0 && aw<getLengthSelectionOfQuestionInExam(id, i));
        if(i>=0 && i<getLengthAnswerOfExam(id))
        {
            answer[id][i] = aw;
        }
        else
        {
            require(i == getLengthAnswerOfExam(id));
            answer[id].push(aw);
        }
    }
    
    function setLengthAnswerOfExam(uint256 id, uint256 len) public payable
    {
        require(existid[id] == true);
        answer[id].length = len;
    }
    
    function existTimeStartOfExam(uint256 id) public view returns(bool)
    {
        require(getExistId(id));
        return timedo[id].setstart;
    }
    
    function existTimeEndOfExam(uint256 id) public view returns(bool)
    {
        require(getExistId(id));
        return timedo[id].setend;
    }
    
    function getTimeStartOfExam(uint256 id) public view returns(bool, string, string)
    {
        if(existTimeStartOfExam(id)==false)
            return(false, "Time Start is not set", "");
        if(existid[id] == false)
            return(false, "ID doesn't exist", "");
        return(true, "Success", timedo[id].start);
    }
    
    function getTimeEndOfExam(uint256 id) public view returns(bool, string, string)
    {
        if(existTimeEndOfExam(id)==false)
            return(false, "Time End is not set", "");
        if(existid[id] == false)
            return(false, "ID doesn't exist", "");
        return(true, "Success", timedo[id].end);
    }
    
    function setTimeStartOfExam(uint256 id, string t) public payable
    {
        require(getExistId(id));
        timedo[id].start = t;
        timedo[id].setstart = true;
    }
    
    function setTimeEndOfExam(uint256 id, string t) public payable
    {
        require(getExistId(id));
        timedo[id].end = t;
        timedo[id].setend = true;
    }
    
    function getPublicOfExam(uint256 id) public view returns(bool)
    {
        require(getExistId(id));
        return epublic[id];
    }
    
    function setPublicOfExam(uint256 id, bool p) public payable
    {
        require(getExistId(id));
        epublic[id] = p;
    }
    
    function getTypeOfExam(uint256 id) public view returns(string)
    {
        require(getExistId(id));
        return etype[id];
    }
    
    function setTypeOfExam(uint256 id, string tp) public payable
    {
        require(getExistId(id));
        etype[id] = tp;
    }
}
