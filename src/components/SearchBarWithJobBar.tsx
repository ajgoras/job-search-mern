import "../styles/SearchBar.css";
import "../styles/style.css";
import { useContext, useState } from "react";
import { Fade } from "react-reveal";
import TagsModal from "./TagsModal";
import JobBar from "./JobBar";
import { SearchTag } from "../types/SearchTag";
import { ContextsType } from "../types/ContextsType";
import { Contexts } from "../contexts/Contexts";

export default function SearchBarWithJobBar() {
  const [searchText, setSearchText] = useState("");
  const [searchTags, setSearchTags] = useState<SearchTag[]>(() => {
    return [];
  });
  const [modalShow, setModalShow] = useState(false);

  const { sortJobs }: ContextsType = useContext(Contexts);

  const handleSortingSelect = (e: any) => {
    if (e.target !== null) {
      if (e.target.value === "latest") {
        sortJobs("latest");
      }
      if (e.target.value === "oldest") {
        sortJobs("oldest");
      }
      if (e.target.value === "highest salary") {
        sortJobs("highest salary");
      }
      if (e.target.value === "lowest salary") {
        sortJobs("lowest salary");
      }
    }
  };
  const handleChangeInput = (e: any) => setSearchText(e.target.value);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (searchText) {
      if (searchTags.length > 4) {
        setModalShow(true);
      } else {
        const obj: SearchTag = { string: searchText, hoverState: false };
        setSearchTags((prevState: SearchTag[]) => [...prevState, obj]);
      }
    }
    setSearchText("");
  };
  return (
    <div>
      <div id="searchBarContainer">
        <Fade delay={150} duration={800}>
          <form onSubmit={handleSubmit}>
            <div id="searchBar">
              <input
                id="searchInput"
                onChange={handleChangeInput}
                value={searchText}
                placeholder="Search"
              ></input>
              <button id="searchButton">🔍</button>
              <div
                id={
                  searchTags.length === 0
                    ? "searchTagsDiv"
                    : "searchTagsDivWithTags"
                }
              >
                {searchTags.length !== 0 ? (
                  searchTags.map((tag: any, index: any) => {
                    return !tag.hoverState ? (
                      <p
                        key={index}
                        className="searchTagParagraph"
                        onMouseEnter={() => {
                          const newSearchTags = searchTags;
                          const newSearchTag = newSearchTags.find(
                            (el: any) => el.string === tag.string
                          );
                          if (newSearchTag) {
                            newSearchTag.hoverState = true;
                          }
                          setSearchTags([...newSearchTags]);
                        }}
                      >
                        {tag.string}
                      </p>
                    ) : (
                      <div
                        className="searchTagWithDelete"
                        onMouseLeave={() => {
                          const newSearchTags = searchTags;
                          const newSearchTag = newSearchTags.find(
                            (el: any) => el.string === tag.string
                          );
                          if (newSearchTag) {
                            newSearchTag.hoverState = false;
                          }
                          setSearchTags([...newSearchTags]);
                        }}
                        onClick={() => {
                          const newSearchTags = searchTags;
                          newSearchTags.splice(index, 1);
                          setSearchTags([...newSearchTags]);
                        }}
                      >
                        <p className="opacity0">{tag.string}</p>
                        <p className="positionAbsolute">X</p>
                      </div>
                    );
                  })
                ) : (
                  <p className="placeholderText">
                    Type something to search job..
                  </p>
                )}
              </div>
            </div>
          </form>
        </Fade>
      </div>
      <Fade delay={290} duration={850}>
        <div id="sortingContainer">
          <div id="sortingLabelContainer">
            <label>Sorting</label>
          </div>
          <select onChange={handleSortingSelect} title="sortingSelect">
            <option title="sortingSelect-option">latest</option>
            <option title="sortingSelect-option">oldest</option>
            <option title="sortingSelect-option">highest salary</option>
            <option title="sortingSelect-option">lowest salary</option>
          </select>
        </div>
      </Fade>
      <Fade delay={350} duration={900}>
        <JobBar
          searchText={searchText}
          searchTags={searchTags.map((tag: SearchTag) => tag.string)}
        ></JobBar>
      </Fade>
      <TagsModal
        setSearchTags={() => {
          setSearchTags([]);
          setModalShow(false);
        }}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
