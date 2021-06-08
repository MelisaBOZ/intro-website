function renderComments(comments, comment_template) {
    for(let comment of comments) {
        renderComment(comment, comment_template);
    }
}

function renderComment(comment, comment_template) {
    let tmp = $(comment_template);

    tmp.find('.name').text(comment.name);
    tmp.find('.profile-image').attr('src',comment.profileImage);
    tmp.find('.comment').text(comment.comment);
    tmp.find('.date').text(comment.date);

    $('#comments').append(tmp);
}

function getRandomImage() {
    return images[Math.floor(Math.random() * images.length)];
}

function zeroControl(val) {
    return val < 10 ? '0'+val : val;
}

const images = [
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://i0.wp.com/newdoorfiji.com/wp-content/uploads/2018/03/profile-img-1.jpg?ssl=1',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtnTHebHSGvxXiYDq_8FkRTBnq_BxX0-yc8IUA_vII1wLSXA-xz0bdYDmoRCSrA4pucUI&usqp=CAU'
];

let comments = [
    {
        name: 'John',
        profileImage: getRandomImage(),
        comment: `Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.`,
        date: '08/06/2021 - 20:42'
    },
    {
        name: 'Melisa',
        profileImage: getRandomImage(),
        comment: 'çok güzel bir website. beğendim',
        date: '08/06/2021 - 20:42'
    },
    {
        name: 'Furkan',
        profileImage: getRandomImage(),
        comment: `Yaygın inancın tersine, Lorem Ipsum rastgele sözcüklerden oluşmaz. Kökleri M.Ö. 45 tarihinden bu yana klasik Latin edebiyatına kadar uzanan 2000 yıllık bir geçmişi vardır. Virginia'daki Hampden-Sydney College'dan Latince profesörü Richard McClintock, bir Lorem Ipsum pasajında geçen ve anlaşılması en güç sözcüklerden biri olan 'consectetur' sözcüğünün klasik edebiyattaki örneklerini incelediğinde kesin bir kaynağa ulaşmıştır. Lorm Ipsum, Çiçero tarafından M.Ö. 45 tarihinde kaleme alınan "de Finibus Bonorum et Malorum" (İyi ve Kötünün Uç Sınırları) eserinin 1.10.32 ve 1.10.33 sayılı bölümlerinden gelmektedir. Bu kitap, ahlak kuramı üzerine bir tezdir ve Rönesans döneminde çok popüler olmuştur. Lorem Ipsum pasajının ilk satırı olan "Lorem ipsum dolor sit amet" 1.10.32 sayılı bölümdeki bir satırdan gelmektedir.`,
        date: '08/06/2021 - 20:42'
    }
];

$(document).ready(function() {
    const comment_template = `
    <li class="d-lg-flex comment-item m-2">
        <div class="col-lg-1 col-xs-12 p-2">
            <img class="profile-image w-100" src="" alt="">
        </div>
        <div>
            <p class="m-0">
                <b class="name text-center"></b> - <small class="date text-muted"></small>
            </p>
            <p class="comment"></p>
            <p>
                <button class="btn btn-danger btn-sm delete-comment">
                    Sil
                </button>
            </p>
        </div>
    </li>
    `;

    renderComments(comments, comment_template);

    $('body').on('submit', '#commentForm', function() {
        const name = $('#name').val().trim();
        const comment = $('#comment').val().trim();
        if(name == '') {
            alert('Ad alanı boş geçilemez.');
            return;
        }
        if(comment == '') {
            alert('Yorum alanı boş geçilemez.');
            return;
        }

        var d = new Date();
        const day = zeroControl(d.getDate());
        const month = zeroControl(d.getMonth()+1);
        const year = zeroControl(d.getFullYear());
        const hours = zeroControl(d.getHours());
        const minutes = zeroControl(d.getMinutes());

        const date = `${day}/${month}/${year} ${hours}:${minutes}`
        const commentItem = {
            name,
            profileImage: getRandomImage(),
            comment,
            date: date
        };
        this.reset();
        renderComment(commentItem, comment_template);
    });


    $('body').on('click', '.delete-comment', function() {
        const thisEl = $(this);

        const thisComment = thisEl.parent().parent().parent();
        thisComment.remove();
    });
});