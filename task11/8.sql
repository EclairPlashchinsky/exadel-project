select USER.NAME, PHOTO_POST.DESCRIPTION, PHOTO_POST.CREATION_DATE FROM USER, PHOTO_POST
where USER.USER_ID = PHOTO_POST.USER_ID  and USER.USER_ID = 122
order by PHOTO_POST.CREATION_DATE ASC;