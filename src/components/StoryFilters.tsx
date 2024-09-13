import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  StackProps,
  VStack,
} from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { IState } from "../types/stateTypes";
import { IStoryFilters } from "../types/storyTypes";
import { ITag } from "../types/tagTypes";

interface StoryFiltersProps extends StackProps {
  filters: IStoryFilters;
  handleFilterChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
  clearFilters: () => void;
  states: Array<IState>;
  tags: Array<ITag>;
}

const StoryFilters: React.FC<StoryFiltersProps> = ({
  filters,
  handleFilterChange,
  clearFilters,
  states,
  tags,
  ...props
}) => {
  return (
    <VStack {...props}>
      <FormControl id="teller">
        <FormLabel>الكاتب</FormLabel>
        <Input
          name="teller"
          color={"white"}
          _placeholder={{ color: "white", opacity: 0.4 }}
          variant={"filled"}
          value={filters?.teller || ""}
          onChange={handleFilterChange}
          placeholder="اسم الكاتب"
        />
      </FormControl>

      <FormControl id="title">
        <FormLabel>العنوان</FormLabel>
        <Input
          name="title"
          color={"white"}
          _placeholder={{ color: "white", opacity: 0.4 }}
          variant={"filled"}
          value={filters?.title || ""}
          onChange={handleFilterChange}
          placeholder="عنوان القصة"
        />
      </FormControl>

      <FormControl id="state">
        <FormLabel>المحافظة</FormLabel>
        <Select
          name="state"
          value={filters?.state || ""}
          onChange={handleFilterChange}
          placeholder="اختر المحافظة"
          _placeholder={{
            color: "white",
            opacity: 0.4,
          }}
        >
          {states &&
            states.map((state) => (
              <option
                style={{ color: "black" }}
                key={state.id}
                value={state.id}
              >
                {state.attributes.name}
              </option>
            ))}
        </Select>
      </FormControl>

      <FormControl id="tag">
        <FormLabel>النوع</FormLabel>
        <Select
          name="tag"
          value={filters?.tag || ""}
          onChange={handleFilterChange}
          placeholder="اخر النوع"
          _placeholder={{
            color: "white",
            opacity: 0.4,
          }}
        >
          {tags &&
            tags.map((tag) => (
              <option style={{ color: "black" }} key={tag.id} value={tag.id}>
                {tag.attributes.name}
              </option>
            ))}
        </Select>
      </FormControl>

      <FormControl id="sort">
        <FormLabel>الترتيب</FormLabel>
        <Select
          name="sort"
          value={filters?.sort || ""}
          onChange={handleFilterChange}
          placeholder="اخر النوع"
          _placeholder={{
            color: "white",
            opacity: 0.4,
          }}
        >
          <option style={{ color: "black" }} value={"clicks"}>
            المشاهدات[تصاعدي]
          </option>
          <option style={{ color: "black" }} value={"-clicks"}>
            المشاهدات[تنازلي]
          </option>
          <option style={{ color: "black" }} value={"createdAt"}>
            التاريخ[تصاعدي]
          </option>
          <option style={{ color: "black" }} value={"-createdAt"}>
            التاريخ[تنازلي]
          </option>
        </Select>
      </FormControl>

      <Button onClick={clearFilters} bgColor={"secondary.500"}>
        مسح الفلاتر
      </Button>
    </VStack>
  );
};

export default StoryFilters;
