// 使用博客系统提供的接口
const widget =xBlog.widget
const tools =xBlog.tools
const database =xBlog.database

// 定义字段
const dbComment = "comment"
const keyNotice = "tool_notice"

// 添加卡片
widget.addSide(false,"更多功能","index.html",function () {
    let db = database.newDb(dbComment)
    let comments = []
    db.FindMany({
        sort: { "_id":-1 },
        filter: { "agree": 1 },
        limit: 5
    },function (err, data) {
        data.forEach(function (item) {
            comments.push({
                id: item.id,
                postId: item.post_id,
                userID: item.user_id,
                nickname: item.nickname,
                avatar: item.avatar===""?tools.getRandomAvatar():item.avatar,
                content: tools.changeCommentSmile(item.content),
                date: tools.time2String(new Date(item.comment_time),true),
                parent: item.parent,
                hang: item.hang,
                level: item.level,
                uid: item.uid
            })
        })
    })
    return {
        comments
    }
},true)
