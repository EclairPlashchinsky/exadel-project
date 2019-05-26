package bsu.plashchinskyAEV.insta.logic;

public class Example {
    public static final PostCollection posts = new PostCollection();

    public static class tr {
        public static boolean getId(PostCollection a, String id) {
            if (a.get(id) != null) {
                return true;
            }
            return false;
        }
    };
}
