select NAME, sum(case when CREATION_DATE = '09.05.2019' then 1 else 0 end) as Number_of_Posts
from USER left join PHOTO_POST
on PHOTO_POST.USER_ID = USER.USER_ID
group by USER.USER_ID;