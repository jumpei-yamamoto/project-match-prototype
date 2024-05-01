$(function () {
  const projectArea = document.getElementById("project-card");
  const projects = JSON.parse(localStorage.getItem("projects"));
  const favoriteCheckbox = document.getElementById("favorite");

  function displayProjects(filterFavorites) {
    projectArea.innerHTML = ""; // 既存のプロジェクトをクリア
    const filteredProjects = filterFavorites
      ? projects.filter(isFavorite)
      : projects;

    filteredProjects.forEach((project, index) => {
      projectArea.appendChild(createProjectArticle(project, index));
    });
  }

  function isFavorite(project) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.some((fav) => fav.id === project.id);
  }

  function createProjectArticle(project, index) {
    const article = document.createElement("article");
    article.className =
      "bg-white p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border";

    const img1 = document.createElement("img");
    img1.src = project.image1;
    img1.alt = "Image 1";
    img1.className =
      "max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105";

    const img2 = document.createElement("img");
    img2.src = project.image2;
    img2.alt = "Image 2";
    img2.className = "h-12 w-12 rounded-full object-cover";

    const projectOverview = document.createElement("h3");
    projectOverview.className = "font-medium text-xl leading-8";
    const overviewLink = document.createElement("a");
    overviewLink.href = "#";
    overviewLink.className =
      "block relative group-hover:text-red-700 transition-colors duration-200";
    overviewLink.textContent = project.projectOverview;
    projectOverview.appendChild(overviewLink);

    article.appendChild(createDivForImageAndIcons(img1, project, index));
    article.appendChild(img2);
    article.appendChild(
      createClientAndProjectInfo(
        project.clientName,
        project.projectName,
        project.postDate
      )
    );
    article.appendChild(projectOverview);

    return article;
  }

  function createDivForImageAndIcons(img, project, index) {
    const div = document.createElement("div");
    div.className = "relative mb-4 rounded-2xl";
    div.appendChild(img);

    const favoriteIconDiv = document.createElement("div");
    favoriteIconDiv.className =
      "absolute bottom-4 left-2 inline-flex items-center rounded-lg bg-white p-2 shadow-md";
    const icon = document.createElement("i");
    icon.className = "fas fa-heart";
    icon.style.fontSize = "24px";

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    icon.classList.add(
      favorites.some((fav) => fav.id === project.id)
        ? "text-red-700"
        : "text-grey-700"
    );

    favoriteIconDiv.appendChild(icon);

    icon.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleFavorite(project, icon);
    });

    div.appendChild(favoriteIconDiv);
    return div;
  }

  function toggleFavorite(project, icon) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const index = favorites.findIndex((fav) => fav.id === project.id);

    if (index > -1) {
      favorites.splice(index, 1);
      icon.classList.replace("text-red-700", "text-grey-700");
    } else {
      favorites.push(project);
      icon.classList.replace("text-grey-700", "text-red-700");
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  function createClientAndProjectInfo(
    clientNameText,
    projectNameText,
    postDateText
  ) {
    const div = document.createElement("div");
    div.className = "flex justify-between items-center w-full pb-4 mb-auto";

    const nameContainer = document.createElement("div");
    nameContainer.className = "flex items-center";

    const clientName = document.createElement("p");
    clientName.textContent = clientNameText;
    clientName.className = "mr-2 text-sm font-semibold";

    const projectName = document.createElement("p");
    projectName.textContent = projectNameText;
    projectName.className = "text-sm text-gray-500";

    nameContainer.appendChild(clientName);
    nameContainer.appendChild(projectName);

    const postDate = document.createElement("div");
    postDate.textContent = postDateText;
    postDate.className = "text-sm flex items-center text-gray-500";

    div.appendChild(nameContainer);
    div.appendChild(postDate);

    return div;
  }

  // 初期表示
  displayProjects(false);

  // お気に入りチェックボックスの状態に応じて表示を切り替える
  favoriteCheckbox.addEventListener("change", function () {
    displayProjects(this.checked);
  });

  // 検索ボタンのクリックイベント
  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      projectArea.innerHTML = ""; // 既存のプロジェクトをクリア
      const storedData = localStorage.getItem("data2");
      if (storedData) {
        const projects = JSON.parse(storedData);
        console.log("取得したデータ:", projects);

        projects.forEach((project, index) => {
          // indexを引数として追加
          const article = document.createElement("article");
          article.className =
            "bg-white p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border";

          const img1 = document.createElement("img");
          img1.src = project.image1;
          img1.alt = "Image 1";
          img1.className =
            "max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105";

          const img2 = document.createElement("img");
          img2.src = project.image2;
          img2.alt = "Image 2";
          img2.className = "h-12 w-12 rounded-full object-cover";

          const projectOverview = document.createElement("h3");
          projectOverview.className = "font-medium text-xl leading-8";
          const overviewLink = document.createElement("a");
          overviewLink.href = "#";
          overviewLink.className =
            "block relative group-hover:text-red-700 transition-colors duration-200";
          overviewLink.textContent = project.projectOverview;
          projectOverview.appendChild(overviewLink);

          article.appendChild(createDivForImageAndIcons(img1, project, index)); // indexを使用
          article.appendChild(img2);
          article.appendChild(
            createClientAndProjectInfo(
              project.clientName,
              project.projectName,
              project.postDate
            )
          );
          article.appendChild(projectOverview);
          projectArea.appendChild(article);
        });
      } else {
        console.log("データが存在しません。");
      }
    });
});
