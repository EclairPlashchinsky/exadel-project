select NAME from USER 
inner join PHOTO_POST on PHOTO_POST.USER_ID = USER.USER_ID
where CREATION_DATE = '25.05.2019'
group by USER.USER_ID 
having count(PHOTO_POST.POST_ID) > 3;