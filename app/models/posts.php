<?php

namespace app\models;

class posts extends Model
{

    public function __construct()
    {
        parent::__construct();
        $this->table = $this->connect();
        $this->fillable = [
            'userId',
            'text',
            'category',
            'hashtag',
            'postId',
            'img'
        ];
    }

    public function addPosts($data)
    {
        if ((isset($data['text']) || isset($data['hashtags']) || isset($_FILES['img'])) && !empty($data['category']) && !empty($data['userId'])) {
            $this->values = [
                $data['userId'],
                $data["text"],
                $data["category"],
                $data["hashtags"],
                NULL,
                getPostImg("img")
            ];
            return $this->insert();
        } else {
            // echo json_encode(["r" => 'e']);
            print_r($data);
            return false;
        }
    }

    public function sharePost($data, $params)
    {
        $userId = $params[2];
        $postId = $params[3];
        if (!empty($data['category']) && !empty($userId) && !empty($postId)) {
            $this->values = [
                $userId,
                $data["text"],
                $data["category"],
                $postId,
                NULL
            ];
            return $this->insert();
        } else {
            echo json_encode(["r" => 'e']);
            return false;
        }
    }

    public function deletePost($data)
    {
        if (!empty($data['postId'])) {
            $this->where([['id', $data['postId']]]);
            deletePostimg($data['img']);
            return $this->delete();
        } else {
            echo json_encode(["r" => 'e']);
            return false;
        }
    }
    
    public function getAllPosts()
    {
        $result = $this->select(['a.*, b.username, c.profilePic'])
            ->join('user b', 'a.userId=b.id')
            ->join('userinfo c', 'b.id=c.userId')
            ->orderBy([['a.created_at', 'DESC']])
            ->get();
        return $result;
    }

    public function getUserPosts($params)
    {
        $userId = $params[2];
        $result = $this->select(['a.*, b.username, c.profilePic'])
            ->join('user b', 'a.userId=b.id')
            ->join('userinfo c', 'b.id=c.userId')
            ->where([['a.userId', $userId]])
            ->orderBy([['a.created_at', 'DESC']])
            ->get();
        return $result;
    }

    public function getPostComments($params)
    {
        $postId = $params[2];
        $result = $this->select(['b.content, c.username, d.profilePic'])
            ->join('comments b', 'a.id=b.postId')
            ->join('user c', 'c.id=b.userId')
            ->join('userinfo d', 'c.id=d.userId')
            ->where([['a.id', $postId]])
            ->orderBy([['b.created_at', 'DESC']])
            ->get();
        return $result;
    }

    public function getPostsByCategory($category)
    {
        $result = $this->select(['a.*, b.username, c.profilePic'])
            ->join('user b', 'a.userId=b.id')
            ->join('userinfo c', 'b.id=c.userId')
            ->where([['a.category', $category]])
            ->orderBy([['a.created_at', 'DESC']])
            ->get();
        return $result;
    }
}
