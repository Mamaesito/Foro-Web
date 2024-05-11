<nav class="sidebar close">
    <header>
        <a href="<?php echo URL; ?>">
            <div class="image-text">
                <span class="image">
                    <img src="<?php echo LOGO; ?>logo.png" alt="logo">
                </span>
                <div class="text header-text">
                    <span class="name">For Us</span>
                </div>
            </div>
        </a>
        <i class='bx bx-chevron-right toggle'></i>
    </header>
    <div class="menu-bar">
        <div class="menu">
            <li class="search-box">
                <i class='bx bx-search-alt-2 icon'></i>
                <input type="text" class="search text" placeholder="Search...">
            </li>
            <ul class="menu-links">
                <li class="nav-link">
                    <a href="<?php echo URL; ?>/home/dashboard">
                        <i class='bx bxs-home icon'></i>
                        <span class="text nav-text">Dashboard</span>
                    </a>
                </li>
                <li class="nav-link">
                    <a href="<?php echo URL; ?>posts/">
                        <i class='bx bxs-file icon'></i>
                        <span class="text nav-text">Posts</span>
                    </a>
                </li>
                <li class="nav-link">
                    <a href="<?php echo URL; ?>comments/">
                        <i class='bx bxs-comment icon'></i>
                        <span class="text nav-text">Comments</span>
                    </a>
                </li>
                <li class="nav-link">
                    <a href="<?php echo URL; ?>user/">
                        <i class='bx bxs-user icon'></i>
                        <span class="text nav-text">Users</span>
                    </a>
                </li>
                <li class="nav-link">
                    <a>
                        <i class='bx bxs-error-circle icon'></i>
                        <span class="text nav-text">Reports</span>
                        <i class='bx bx-chevron-right dropdown'></i>
                    </a>
                </li>
                <div class="sub-menu">
                    <a href="<?php echo URL; ?>reports/posts" class="text sub-item">Post</a>
                    <a href="<?php echo URL; ?>reports/comments" class="text sub-item">Commets</a>
                    <a href="<?php echo URL; ?>reports/users" class="text sub-item">Users</a>
                </div>

                <?php if (isset($ua->sv) && $ua->sv && $ua->id == 1) { ?>
                    <li class="nav-link">
                    <a href="#">
                            <i class='bx bx-history icon'></i>
                            <span class="text nav-text">Activity Log</span>
                            <!-- <i class='bx bx-chevron-right dropdown'></i> -->
                        </a>
                    </li>
                <?php } ?>

                <!-- <div class="sub-menu">
                    <a href="#" class="text sub-item">Posts</a>
                    <a href="#" class="text sub-item">Comments</a>
                    <a href="#" class="text sub-item">Users</a>
                </div>

                <li class="nav-link">
                    <a href="#">
                        <i class='bx bxs-bell icon'></i>
                        <span class="text nav-text">Notifications</span>
                    </a>
                </li> -->

                <li class="nav-link">
                    <a href="<?php echo URL; ?>profile/user">
                        <i class='bx bxs-user-circle icon'></i>
                        <span class="text nav-text">My account</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="bottom-content">

            <li class="mode">
                <div class="moon-sun">
                    <i class='bx bxs-moon icon moon'></i>
                    <i class='bx bxs-sun icon sun '></i>
                </div>
                <span class="mode-text text"></span>
                <div class="toggle-switch">
                    <span class="switch">

                    </span>
                </div>
            </li>

            <li class="">
                <a id="btn_logout" href="<?php echo URL; ?>login/logout">
                    <i class='bx bxs-log-out icon'></i>
                    <span class="text nav-text">Log out</span>
                </a>
            </li>
        </div>
    </div>
</nav>